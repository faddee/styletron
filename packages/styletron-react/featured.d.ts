import * as React from "react";
import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";
import StyletronReact from './';

export class StyletronProvider extends React.Component<{styletron: StyletronServer | StyletronClient}, void> {}
export var styled: typeof StyletronReact.styled;
