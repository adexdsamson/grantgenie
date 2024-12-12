import { ReactNode } from 'react';
// import { List } from 'react-virtualized';

type MapListType<T = unknown> = {
    data: T[],
    virtualize?: boolean
    isLoading?: boolean,
    className?: string,
    ListEmptyComponent?: ReactNode,
    PlaceholderComponent?: () => JSX.Element,
    renderItem: (item: T, index: number) => JSX.Element,
    getItemLayout?: () => { width: number, height: number, rowHeight: number }
}

export const MapList =<T extends unknown = unknown> (props: MapListType<T>) => {
    const {
        // virtualize,
        renderItem,
        data,
        // className,
        ListEmptyComponent,
        PlaceholderComponent,
        isLoading,
        // getItemLayout
    } = props;

    // if (virtualize && getItemLayout) {
    //     return (
    //         <ListVirtualized
    //             renderItem={renderItem}
    //             getItemLayout={getItemLayout}
    //             className={className ?? ""}
    //             data={data}
    //             ListEmptyComponent={ListEmptyComponent}
    //             PlaceholderComponent={PlaceholderComponent}
    //             isLoading={isLoading}
    //         />
    //     )
    // }

    return (
        <NormalList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent}
            PlaceholderComponent={PlaceholderComponent}
            isLoading={isLoading}
        />
    )
}

// type ListVirtualizedType<T = unknown> = Required<Omit<MapListType<T>, "virtualize" | "ListEmptyComponent" | "PlaceholderComponent"| "isLoading">> & Omit<MapListType, "virtualize" | "data" | "getItemLayout" | "renderItem">

// const ListVirtualized =<T extends unknown = unknown> (props: ListVirtualizedType<T>) => {
//     const { data, renderItem, getItemLayout, className, ListEmptyComponent, PlaceholderComponent, isLoading } = props;
//     const { height, width, rowHeight } = getItemLayout();

//     if (isLoading && data.length === 0 && PlaceholderComponent) {
//         return Array(10).fill(0).map((_, index) => (
//             <PlaceholderComponent key={index} />
//         ));
//     }

//     if (ListEmptyComponent && data.length === 0) return ListEmptyComponent;

//     return (
//         <List
//             width={width}
//             height={height}
//             rowCount={data.length}
//             rowHeight={rowHeight}
//             className={className}
//             rowRenderer={({ index }) => renderItem(data[index], index)}
//         />
//     )
// }

type NormalListType<T = unknown> = Pick<MapListType<T>, "ListEmptyComponent" | "PlaceholderComponent" | "renderItem" | "isLoading" | "data">

const NormalList = <T extends unknown = unknown> ({ ListEmptyComponent, PlaceholderComponent, renderItem, isLoading, data }: NormalListType<T>) => {
    if (isLoading && data.length === 0 && PlaceholderComponent) {
        return Array(10).fill(0).map((_, index) => (
            <PlaceholderComponent key={index} />
        ));
    }

    if (ListEmptyComponent && data.length === 0) return ListEmptyComponent;

    return data.map((item, index) => renderItem(item, index))
}