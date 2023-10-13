import axios, { AxiosRequestConfig } from 'axios';

export interface FilePutPayload {
  url: string;
  file: File;
  options?: AxiosRequestConfig;
}

class FileCrudService {
  private http;

  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async put({ url, file, options }: FilePutPayload) {
    try {
      return await this.http.put(url, file, {
        ...options,
        headers: {
          'Content-Type': file.type,
        },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        return { status: 'cancelled' };
      }

      throw typeof error === 'string' ? new Error(error) : error;
    }
  }
}

export default new FileCrudService();
