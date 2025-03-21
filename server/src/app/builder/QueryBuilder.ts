import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = modelQuery;
    this.query = query;
  }
  // ----- search ----- //
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // ----- filter ----- //
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  // ----- sort ----- //
  sort() {
    let sortBy = this.query.sortBy || 'createdAt';
    let sortOrder = this.query.sortOrder || 'desc';

    // Convert sortOrder to 1 or -1
    const order = sortOrder === 'asc' ? 1 : -1;

    this.queryModel = this.queryModel.sort({ [sortBy as string]: order });

    return this;
  }

  // ----- populate ----- //
  populate() {
    this.queryModel = this.queryModel.populate('author', '_id name email');
    return this;
  }
}

export default QueryBuilder;
