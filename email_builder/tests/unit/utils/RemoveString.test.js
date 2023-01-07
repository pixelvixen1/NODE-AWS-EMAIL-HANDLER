require('../../../utils/RemoveString');

test('Remove nth occurance of a string/word from a string ', () => {
  const txt = 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.';
  expect(txt.removeStr('code ', 1)).toEqual('Any fool can write that a computer can understand. Good programmers write code that humans can understand.');
  expect(txt.removeStr('code ', 2)).toEqual('Any fool can write code that a computer can understand. Good programmers write that humans can understand.');
  expect(txt.removeStr('that ', 1)).toEqual('Any fool can write code a computer can understand. Good programmers write code that humans can understand.');
  expect(txt.removeStr('that ', 2)).toEqual('Any fool can write code that a computer can understand. Good programmers write code humans can understand.');
  expect(txt.removeStr('can ', 2)).toEqual('Any fool can write code that a computer understand. Good programmers write code that humans can understand.');
  expect(txt.removeStr('can ', 3)).toEqual('Any fool can write code that a computer can understand. Good programmers write code that humans understand.');
});
