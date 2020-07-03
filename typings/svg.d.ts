declare interface SvgComponent extends React.StatelessComponent<React.SVGAttributes<SVGAElement>> {}

// svg图片本身并不具备模块化的功能，也不提供模块导出，所以在导入的时候是不能识别的， 所以需要声明一个门模块
declare module '*.svg' {
    const content: any;
    export default content;
}