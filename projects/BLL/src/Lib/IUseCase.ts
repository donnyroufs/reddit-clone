export interface IUseCase<TOutput, TInput = unknown> {
  execute(input: TInput): Promise<TOutput>
}
