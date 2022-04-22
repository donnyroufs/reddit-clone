import { ExcludeHooks, TestableEnergizor } from "@kondah/energizor"
import {
  BLLCollection,
  GetAllSubredditsDto,
  SubredditDto,
  SubredditsDto,
  SubredditServiceLocator,
} from "@rclone/bll"
import {
  DALCollection,
  SubredditEntity,
  SubredditRepository,
} from "@rclone/dal"
import { mockDeep } from "jest-mock-extended"
import { createMock, createMockList } from "ts-auto-mock"

@Describe()
export class GetAllSubredditsUseCaseSpec {
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
  public async successfullyReturnsSubreddits() {
    const stub = createMock<GetAllSubredditsDto>()
    const returnedValue = createMockList<SubredditEntity>(5, (i) => ({
      id: "" + i,
    }))
    const expectedResult = createMock<SubredditsDto>({
      subreddits: returnedValue.map(SubredditDto.fromPersistence),
    })

    this._repoMock.getAllByPage.mockResolvedValueOnce(returnedValue)

    const result = await this._sut.getAllSubredditsUseCase.execute(stub)

    expect(result).toEqual(expectedResult)
  }
}
