import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronUtils {
  type InjectStyle = (styles: Object, media?: string, pseudo?: string) => string;
  type StyletronInjectStyle = (styletron: StyletronServer | StyletronClient) => InjectStyle;
  type CreateInjectStyle = (plugins?: (styles: Object) => Object, ...middlewares: Function[]) => StyletronInjectStyle;

  export var createInjectStyle: CreateInjectStyle;
  export var injectStyle: StyletronInjectStyle;
  export var injectStylePrefixed: StyletronInjectStyle;
}

export = StyletronUtils;
