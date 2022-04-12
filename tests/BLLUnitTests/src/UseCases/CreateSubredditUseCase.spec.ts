import { ExcludeHooks, TestableEnergizor } from "@kondah/energizor"
import { mockDeep } from "jest-mock-extended"
import { createMock } from "ts-auto-mock"

import { BLLCollection, CreateSubredditDto, SubredditDto } from "@rclone/bll"
import { SubredditServiceLocator } from "@rclone/bll"
import {
  DALCollection,
  SubredditEntity,
  SubredditRepository,
} from "@rclone/dal"
import { EntityAlreadyExistsException } from "@rclone/bll"

@Describe()
export class CreateSubredditUseCaseSpec {
  private _di: TestableEnergizor
  private _repoMock = mockDeep<SubredditRepository>()
  private _sut: ExcludeHooks<SubredditServiceLocator>

  @BeforeAll()
  public async setup() {
    this._di = new TestableEnergizor([BLLCollection, DALCollection])

    await this._di.boot()

    this._di.rebind(SubredditRepository, this._repoMock)

    this._sut = this._di.get(SubredditServiceLocator)
  }

  @Test()
  public async successfulyCreatesASubreddit() {
    const uniqId = "id"

    const stub = createMock<SubredditEntity>({ id: uniqId })
    const createStub = createMock<CreateSubredditDto>()
    const expectedResult = createMock<SubredditDto>({
      ...SubredditDto,
      id: uniqId,
    })

    this._repoMock.create.mockResolvedValueOnce(stub)

    const result = await this._sut.createSubredditUseCase.execute(createStub)

    expect(result).toEqual(expectedResult)
  }

  @Test()
  public async throwsWhenTryingToCreateADuplicate() {
    const createStub = createMock<CreateSubredditDto>()

    this._repoMock.exists.mockResolvedValueOnce(true)

    const act = () => this._sut.createSubredditUseCase.execute(createStub)

    expect(act).rejects.toThrowError(EntityAlreadyExistsException)
  }
}
