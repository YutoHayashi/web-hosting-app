export type Handler = {
    validation: (  ) => Array<string | true>;
    getValue: (  ) => any;
    reset: (  ) => void;
};
