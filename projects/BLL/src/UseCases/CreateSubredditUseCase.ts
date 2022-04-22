import { Injectable } from "@kondah/energizor"

import { SubredditRepository, SubredditEntity } from "@rclone/dal"
import { CreateSubredditDto } from "../Dtos/CreateSubredditDto"
import { SubredditDto } from "../Dtos/SubredditDto"
import { EntityAlreadyExistsException } from "../Exceptions/EntityAlreadyExistsException"
import { IUseCase } from "../Lib/IUseCase"

@Injectable()
export class CreateSubredditUseCase
  implements IUseCase<SubredditDto, CreateSubredditDto>
{
  public constructor(
    private readonly _subredditRepository: SubredditRepository
  ) {}

  public async execute(input: CreateSubredditDto): Promise<SubredditDto> {
    const entity = new SubredditEntity(
      input.name,
      input.description,
      input.userId
    )

    await this.throwWhenSubredditAlreadyExistsAsync(input)

    const result = await this._subredditRepository.create(entity)

    return SubredditDto.fromPersistence(result)
  }

  private async throwWhenSubredditAlreadyExistsAsync(
    input: CreateSubredditDto
  ) {
    const exists = await this._subredditRepository.exists(input.name)

    if (exists) {
      throw new EntityAlreadyExistsException()
    }
  }
}
