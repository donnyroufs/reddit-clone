import { Injectable } from "@kondah/energizor"
import { SubredditRepository } from "@rclone/dal"
import { IGetAllSubredditsDto } from "../Dtos/IGetAllSubredditsDto"
import { SubredditDto } from "../Dtos/SubredditDto"
import { SubredditsDto } from "../Dtos/SubredditsDto"
import { IUseCase } from "../Lib/IUseCase"

@Injectable()
export class GetAllSubredditsUseCase
  implements IUseCase<SubredditsDto, IGetAllSubredditsDto>
{
  public constructor(
    private readonly _subredditRepository: SubredditRepository
  ) {}

  public async execute(input: IGetAllSubredditsDto): Promise<SubredditsDto> {
    const result = await this._subredditRepository.getAllByPage(
      input.page,
      input.limit
    )

    return new SubredditsDto(
      result.map(
        (val) =>
          new SubredditDto(val.id!, val.name, val.description, val.createdAt)
      ),
      await this.getHasMore(input)
    )
  }

  private async getHasMore(input: IGetAllSubredditsDto) {
    const total = await this._subredditRepository.getTotal()
    const offset = input.limit * input.page

    return offset + input.limit < total
  }
}
