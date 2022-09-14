
`asynchronous`

1. use `eventEmitter` instead of read entire file at once.


2. `pipe` event

Event: 'pipe'
Added in: v0.9.4

src <stream.Readable> source stream that is piping to this writable
The 'pipe' event is emitted when the stream.pipe() method is called on a readable stream, adding this writable to its set of destinations.

将readable stream 通过pipe api转入writeable stream

```
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();

// 监听pipe事件
writer.on('pipe', (src) => {
  console.log('Something is piping into the writer.');
  assert.equal(src, reader);
});

reader.pipe(writer);
```
