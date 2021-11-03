export type Handler = {
    validation: (  ) => Array<string | true>;
    value: (  ) => any;
    reset: (  ) => void;
};
