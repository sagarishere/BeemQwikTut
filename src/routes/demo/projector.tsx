import { component$, Slot } from "@builder.io/qwik";

export interface ProjectorProps {
  message?: string;
  color: string;
}

export const defaultProps: ProjectorProps = {
  color: 'blue',
};

export const Projector = component$((props: ProjectorProps) => {
  return (
    <p>
      <Slot /> {props.message == "llama" ? <RedLlama message={props.message} color={props.color}/> : props.message}
    </p>
  );
});

export const RedLlama = component$((props: ProjectorProps) => {
  
  return (
    console.log('RedLlama', props.color),
    <span style={{color: props.color}}>{props.message}</span>
  );
}
);


