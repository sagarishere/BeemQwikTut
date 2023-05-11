import type { Signal } from "@builder.io/qwik";
import { component$, Slot, useSignal, useTask$ } from "@builder.io/qwik";
import { Projector } from "./projector";

export default component$(() => {
  const isSagarVisibleSignal = useSignal(false);
  const didHeGetBeerSignal = useSignal(false);

  useTask$(({track}) => {
    track(()=> didHeGetBeerSignal.value);
    isSagarVisibleSignal.value = didHeGetBeerSignal.value ? true: false;
  });

  return (
    <div class="container container-flex-column">
      <h1>demo</h1>
      <SuperBla>Slot Message Here</SuperBla>
      <p>The following are the links to demos</p>
      <ul>
        <li> <a href="/demo/flower">Flower App</a> </li>
        <li> <a href="/demo/todolist">Todo App</a> </li>
      </ul>
      <br /><br />
      <InputBox />
      <br /><br />
      <BeerGiver gotBeerSignal={didHeGetBeerSignal} />
      <br /><br /><br />
      {isSagarVisibleSignal.value ? <Sagar> My Goodness </Sagar> : null}
    </div>
  );
});

export const InputBox = component$(() => {
  const inputTextYouTypedSignal = useSignal("");
  return (
    <div>
      <hr />
      <input type="text" placeholder="Type your search" onInput$={(event) => {
          inputTextYouTypedSignal.value = (event.target as HTMLInputElement).value;
        }}/>
      <br />
      <Projector message={inputTextYouTypedSignal.value} color="red">
        Your message is: 
      </Projector>
      <hr />
    </div>
  );
});

interface BeerGiverProps {
  gotBeerSignal: Signal<boolean>;
}

export const BeerGiver = component$((props: BeerGiverProps) => {
  return (
      <button onClick$={()=>
      props.gotBeerSignal.value = true}>Give a Beer to Sagar</button>
  );
});

export const SuperBla = component$(() => {
  return (
      <bla>Super <Slot /> Bla</bla>
  );
});

export const Sagar = component$(() => {
  return (
    <bla>
      Sagar is here with Slow message: <Slot />
    </bla>
  );
});
