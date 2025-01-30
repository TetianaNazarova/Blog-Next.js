import H1 from "@/components/h1";

export function useMDXComponents(components: any) {
    return {
        h1: (props: any) => <H1 { ...props } />,
        ...components,
    }
}
