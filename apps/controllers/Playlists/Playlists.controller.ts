import { APIRequestContext } from "@playwright/test";

export class Playlists {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPlaylistById(id: string) {
    const response = await this.request.get(`https://api.spotify.com/v1/playlists/${id}`, {});

    return response;
  }

  async createPlaylist(
    userId: string,
    data: {
      name: string;
      description: string;
      public: boolean;
    }
  ) {
    const response = await this.request.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      data: data,
    });

    return response;
  }

  async getPlaylistItems(playlistId: string) {
    const response = await this.request.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {});

    return response;
  }

  async updatePlaylistItems(
    playlistId: string,
    data: {
      range_start: number;
      insert_before: number;
      range_length: number;
    }
  ) {
    const response = await this.request.put(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      data: data,
    });

    return response;
  }

  async addItemsToPlaylist(
    playlistId: string,
    data: {
      uris: Array<string>;
      position: number;
    }
  ) {
    const response = await this.request.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      data: data,
    });

    return response;
  }

  async removeItemsFromPlaylist(
    playlistId: string,
    data: {
      tracks: { uri: string }[];
      snapshot_id?: string;
    }
  ) {
    const response = await this.request.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      data: data,
    });

    return response;
  }
}
