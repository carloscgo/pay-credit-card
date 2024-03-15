import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Some = any;

export interface Http {
    get: <T>(path: string, params?: Record<string, Some>, config?: Some) => Promise<T | Some>;
    post: <T>(path: string, params?: Record<string, Some>, config?: Some) => Promise<T | Some>;
    put: <T>(path: string, params?: Record<string, Some>, config?: Some) => Promise<T | Some>;
    delete: <T>(path: string, params?: Some, config?: Some) => Promise<T | Some>;
}

const headers = {
    'Content-Type': 'application/json'
};

axios.defaults.baseURL = 'https://fakestoreapi.com';

export const httpAxios: Http = {
    get: async <T>(path: string, params?: Record<string, Some>, config?: Some) => {
        const response = await axios.get(path, { ...config, params, headers });

        return response.data as T;
    },
    post: async <T>(path: string, params?: Record<string, Some>, config?: Some) => {
        const response = await axios.post(path, { ...params }, { ...config, headers });

        return response.data as T;
    },
    put: async <T>(path: string, params?: Record<string, Some>, config?: Some) => {
        const response = await axios.put(path, { ...params }, { ...config, headers });

        return response.data as T;
    },
    delete: async <T>(path: string, params?: Some, config?: Some) => {
        const response = await axios.delete(path, { ...config, params, headers });

        return response.data as T;
    }
};
