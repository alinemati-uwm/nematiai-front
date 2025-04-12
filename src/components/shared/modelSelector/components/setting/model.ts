const settingModelContainerModel = (() => {
  const hendleKeyDown = (e: any) => {
    const num = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      ".",
    ];
    if (e.ctrlKey || e.metaKey) return;
    if (!num.includes(e.key)) e.preventDefault();
  };

  return { hendleKeyDown };
})();

export default settingModelContainerModel;
