import axios from "axios"

export interface ICreateSubredditRequest {
  title: string
  description: string
}

interface IGetSubredditsResponse {
  subreddits: ISubreddit[]
  hasMore: boolean
}

interface ICreateSubredditResponse extends ISubreddit {}

interface ISubreddit {
  id: string
  title: string
  description: string
  createdAt: Date
}

export class SubredditRepository {
  public static async getSubreddits(
    page = 0,
    limit = 0
  ): Promise<IGetSubredditsResponse> {
    const data = await axios.get<IGetSubredditsResponse>(
      `http://localhost:5000/subreddit?page=${page}&limit=${limit}`
    )

    // TODO: Mapping
    return {
      subreddits: data.data.subreddits,
      hasMore: data.data.hasMore,
    }
  }

  public static async createSubreddit(
    subreddit: ICreateSubredditRequest
  ): Promise<ISubreddit> {
    const data = await axios.post<ICreateSubredditResponse>(
      `http://localhost:5000/subreddit`,
      subreddit
    )

    // TODO: Mapping
    return data.data
  }
}
