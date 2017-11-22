interface IState {
  date: string;
  gold: number;
  portId: number;
}

const state = (): IState => {
  const defaultState: IState = {
    date: "1522-05-17T08:00:00+00:00",
    gold: 0,
    portId: 0,
  };

  const savedState: IState = JSON.parse(localStorage.getItem("state"));

  return savedState || defaultState;
};

export default state();
