import { Injectable } from "@kondah/energizor"

import { SubredditRepository, SubredditEntity } from "@rclone/dal"

import { ICreateRedditDto } from "../Dtos/ICreateSubredditDto"
import { SubredditDto } from "../Dtos/SubredditDto"
import { IUseCase } from "../Lib/IUseCase"

@Injectable()
export class CreateSubredditUseCase
  implements IUseCase<SubredditDto, ICreateRedditDto>
{
  public constructor(
    private readonly _subredditRepository: SubredditRepository
  ) {}

  public async execute(input: ICreateRedditDto): Promise<SubredditDto> {
    const entity = new SubredditEntity(input.title, input.description)

    const result = await this._subredditRepository.create(entity)

    return new SubredditDto(
      result.id!,
      result.title,
      result.description,
      result.createdAt
    )
  }
}
