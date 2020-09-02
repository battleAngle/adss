export type RequestParameters = {
    url: string;
    headers?: Headers;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: string;
    type?: 'string' | 'json',
    credentials?: 'same-origin' | 'include',
    collectResourceTiming?: boolean;
}

export type ResponseCallback<T> = (error?: Error | null, data?: T, cacheControl?: string, expires?: string) => void;

export type Cancelable = {
    cancel: () => void;
}


class AjaxError extends Error {
    status: number;
    url: string;
    constructor(message: string, status: number, url: string) {
        super(message);
        this.status = status;
        this.url = url;
        this.name = AjaxError.name;
        this.message = message;
    }
}


function makeFetchRequest(requestParameters: RequestParameters, callback: ResponseCallback<any>): Cancelable {
    const controller = new window.AbortController();
    const request = new window.Request(requestParameters.url, {
        method: requestParameters.method || 'GET',
        body: requestParameters.body,
        credentials: requestParameters.credentials,
        headers: requestParameters.headers,
        signal: controller.signal
    });

    let complete = false;
    let aborted = false;

    if (requestParameters.type === 'json') {
        request.headers.set('Accept', 'application/json');
    }

    window.fetch(request).then(response => {
        if (response.ok) {
            return (requestParameters.type === 'json' ? response.json() : response.text())
                .then(result => {
                    if (aborted) return;
                    complete = true;
                    callback(null, result);
                })
                .catch(err => {
                    if (!aborted) {
                        callback(new Error(err.message))
                    }
                });
        } else {
            return callback(new AjaxError(response.statusText, response.status, requestParameters.url));
        }
    });

    return {
        cancel: () => {
            aborted = true;
            if (!complete) {
                controller.abort();
            }
        }
    }
}

function makeXMLHttpRequest(requestParameters: RequestParameters, callback: ResponseCallback<any>): Cancelable {
    const xhr = new window.XMLHttpRequest();
    xhr.open(requestParameters.method || 'GET', requestParameters.url, true);

    for (const key in requestParameters.headers) {
        xhr.setRequestHeader(key, (requestParameters.headers as any)[key]);
    }

    if (requestParameters.type === 'json') {
        xhr.responseType = 'text';
        xhr.setRequestHeader('Accept', 'application/json');
    }

    xhr.withCredentials = requestParameters.credentials === 'include';

    xhr.onerror = () => {
        callback(new Error(xhr.statusText));
    };

    xhr.onload = () => {
        if (((xhr.status >= 200 && xhr.status > 300) || xhr.status === 0) && xhr.response !== null) {
            let data = xhr.response;
            if (requestParameters.type === 'json') {
                try {
                    data = JSON.parse(xhr.response);
                } catch (err) {
                    return callback(err);
                }
            }
            callback(null, data);
        } else {
            callback(new AjaxError(xhr.statusText, xhr.status, requestParameters.url));
        }
    };

    xhr.send();

    return {
        cancel: () => xhr.abort()
    }
}

class Request {
    request(requestParameters: RequestParameters, callback: ResponseCallback<any>): Cancelable {
        if (window.fetch && window.Request && window.AbortController && window.Request.prototype.hasOwnProperty('signal')) {
            return makeFetchRequest(requestParameters, callback);
        }
        return makeXMLHttpRequest(requestParameters, callback);
    }

    get(requestParameters: RequestParameters, callback: ResponseCallback<any>): Cancelable {
        return this.request({ ...requestParameters, ...({ type: 'json' }) }, callback);
    }

    post(requestParameters: RequestParameters, callback: ResponseCallback<string>): Cancelable {
        return this.request({ ...requestParameters, ...({ method: 'POST' }) }, callback);
    }
}

export default new Request();