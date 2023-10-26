export function setupWindowEventListener() {
  const FunctionMap: Function[] = [];
  function listen() {
    window.addEventListener("resize", (e) => {
      FunctionMap.forEach((Func) => Func(e));
    });
  }
  function watchWindowChange(func: Function) {
    FunctionMap.push(func);
  }
  return { watchWindowChange, listen };
}
