# Tinylib
Tinylib is a cute little library and nest service for working with the [nanokey](https://github.com/jparr721/nanokey) database. It features a dead simple api for doing storage operations.

## Behold, the power of tinylib
```ts
// something.service.ts
class SomethingService {
  constructor(private readonly service: TinylibService) {}
  
  async insert(key: string, value: string): Promise<boolean> {
    const result = await this.service.addKey(key, value);
    
    return result; // true
  }
}
```
It's that easy to have extremely fast read-write capability in your application.

### Tests

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
