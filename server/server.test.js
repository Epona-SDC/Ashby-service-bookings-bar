
// testing jest.fn
test('testing parameters and usage of jest.fn', () => {
  const mockFunc = jest.fn();
  mockFunc('a', 'b', 1);
  expect(mockFunc).toHaveBeenCalledTimes(1);
  expect(mockFunc).toHaveBeenCalledWith('a', 'b', 1);
  expect(mockFunc).not.toHaveBeenCalledWith('a', 'b', 'c');
});