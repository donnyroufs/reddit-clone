import { Injectable } from "@kondah/energizor"
import { SubredditRepository } from "@rclone/dal"

import { GetAllSubredditsDto } from "../Dtos/GetAllSubredditsDto"
import { SubredditDto } from "../Dtos/SubredditDto"
import { SubredditsDto } from "../Dtos/SubredditsDto"
import { IUseCase } from "../Lib/IUseCase"

@Injectable()
export class GetAllSubredditsUseCase
  implements IUseCase<SubredditsDto, GetAllSubredditsDto>
{
  public constructor(
    private readonly _subredditRepository: SubredditRepository
  ) {}

  public async execute(input: GetAllSubredditsDto): Promise<SubredditsDto> {
    const result = await this._subredditRepository.getAllByPage(
      input.page,
      input.limit
    )

    return new SubredditsDto(
      result.map(SubredditDto.fromPersistence),
      await this.getHasMore(input)
    )
  }

  private async getHasMore(input: GetAllSubredditsDto) {
    const total = await this._subredditRepository.getTotal()
    const offset = input.limit * input.page

    return offset + input.limit < total
  }
}
