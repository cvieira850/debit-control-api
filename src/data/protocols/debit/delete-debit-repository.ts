
export interface DeleteDebitRepository {
  delete: (id: number) => Promise<void>
}
