import { ChevronDown } from 'lucide-react';
import { Fragment, useRef, useState, ReactNode, CSSProperties } from 'react';

// Type definitions
interface ColumnChild {
    key: string | ((value: any) => any);
    title?: string;
    render?: (value: any, rowData: any, keyColumn: number) => ReactNode;
    renderHeader?: ReactNode;
    stylesHeader?: string;
    cellStyle?: string;
    onSort?: (sortString: string) => void;
}

interface Column {
    key?: string | ((value: any) => any);
    title?: string;
    render?: (value: any, rowData: any, keyColumn: number) => ReactNode;
    renderHeader?: ReactNode;
    stylesHeader?: string;
    cellStyle?: string;
    onSort?: (sortString: string) => void;
    children?: ColumnChild[];
}

interface TableParams {
    sort?: string;
    page?: number;
    size?: number;
    [key: string]: any;
}

interface ErrorType {
    message: string;
    [key: string]: any;
}

interface TableProps {
    columns: Column[];
    dataList: any[] | null;
    params?: TableParams;
    showNumber?: boolean;
    loading?: any;
    error?: ErrorType | null;
    customDataNotFoundMessage?: string;
}

interface ColumnWidths {
    [key: string]: number;
}

const Table: React.FC<TableProps> = ({
    columns,
    dataList,
    params = {},
    showNumber = true,
    loading = 'idle',
    error = null,
    customDataNotFoundMessage = 'Data tidak ditemukan'
}) => {
    const [columnWidths, setColumnWidths] = useState<ColumnWidths>({});
    const tableRef = useRef<HTMLTableElement>(null);
    const { sort = '' } = params;
    const [colNum, setColNum] = useState<string>('10px');

    const generateChildren = (): ReactNode[] => {
        const [sortKey, sortValue] = sort?.split?.(',') ?? [];
        return columns.map((objK) => {
            if (objK.children) {
                return objK.children.map((obj, index) => {
                    if (obj.renderHeader) {
                        return (
                            <th
                                key={index}
                                className={`px-4 py-2 text-left font-medium text-gray-700 ${obj.stylesHeader || ''}`}
                            >
                                {obj.renderHeader}
                            </th>
                        );
                    }
                    if (obj.onSort && dataList && dataList.length > 0) {
                        return (
                            <th
                                key={index}
                                className={`px-4 py-2 text-left font-medium text-gray-700 ${obj.stylesHeader || ''}`}
                            >
                                <button
                                    onClick={() => obj.onSort!(sort === `${obj.key},asc` ? `${obj.key},desc` : `${obj.key},asc`)}
                                    className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                                >
                                    {obj.title}
                                    {(sortKey === obj.key) && (
                                        <span className={`ml-2 ${sortValue === 'asc' ? 'rotate-180' : ''}`}>
                                            <ChevronDown className='h-5 w-5' />
                                        </span>
                                    )}
                                </button>
                            </th>
                        );
                    }
                    return (
                        <th
                            key={index}
                            className={`px-4 py-2 text-left font-medium text-gray-700 ${obj.stylesHeader || ''}`}
                        >
                            {obj.title}
                        </th>
                    );
                });
            }
            return [null];
        });
    };

    const renderColumn = (columnData: Column, rowData: any, keyColumn: number): ReactNode => {
        const { key, render, children, cellStyle } = columnData;
        const value = getValueColumn(rowData, key);

        const baseCellClasses = "px-4 py-2 text-sm text-gray-600 truncate max-w-[50px] overflow-hidden whitespace-nowrap";

        if (render) {
            return (
                <td
                    key={keyColumn}
                    className={`${baseCellClasses} ${cellStyle || ''}`}
                    style={{ width: columnWidths[key as string] || 'auto' } as CSSProperties}
                >
                    {render(value, rowData, keyColumn)}
                </td>
            );
        } else if (children) {
            return children?.map((item, index) => {
                const { key, render } = item;
                const valuex = getValueColumn(rowData, key);
                return (
                    <td
                        key={index}
                        className={`${baseCellClasses} ${cellStyle || ''}`}
                        style={{ width: columnWidths[key as string] || 'auto' } as CSSProperties}
                    >
                        {render ? render(valuex, rowData, keyColumn) : valuex || '-'}
                    </td>
                );
            });
        } else {
            return (
                <td
                    key={keyColumn}
                    className={`${baseCellClasses} ${cellStyle || ''}`}
                    style={{ width: columnWidths[key as string] || 'auto' } as CSSProperties}
                >
                    {(value) ? value : '-'}
                </td>
            );
        }
    };

    const getValueColumn = (value: any, dataIndex?: string | ((value: any) => any)): any => {
        switch (typeof dataIndex) {
            case 'function':
                return dataIndex(value);
            case 'string':
                return value[dataIndex];
            default:
                return null;
        }
    };

    const handleColumnResizeNums = (event: React.MouseEvent<HTMLDivElement>): void => {
        const startX = event.clientX;
        const startWidth = tableRef.current?.rows[0]?.cells[0]?.offsetWidth || 0;

        const mouseMoveHandler = (moveEvent: MouseEvent): void => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            setColNum(`${newWidth}px`);
        };

        const mouseUpHandler = (): void => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        };

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    };

    const handleColumnResize = (index: number, event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
        const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const startWidth = tableRef.current?.rows[0]?.cells[index]?.offsetWidth || 0;

        const moveHandler = (moveEvent: MouseEvent | TouchEvent): void => {
            const currentX = 'touches' in moveEvent ? (moveEvent as TouchEvent).touches[0].clientX : (moveEvent as MouseEvent).clientX;
            const newWidth = startWidth + (currentX - startX);
            setColumnWidths((prev) => ({ ...prev, [columns[index].key as string]: newWidth }));
        };

        const upHandler = (): void => {
            window.removeEventListener("mousemove", moveHandler);
            window.removeEventListener("mouseup", upHandler);
            window.removeEventListener("touchmove", moveHandler);
            window.removeEventListener("touchend", upHandler);
        };

        window.addEventListener("mousemove", moveHandler);
        window.addEventListener("mouseup", upHandler);
        window.addEventListener("touchmove", moveHandler);
        window.addEventListener("touchend", upHandler);
    };

    const generateResizableHeader = (): ReactNode[] => {
        return columns.map((obj, index) => {
            const [sortKey, sortValue] = sort?.split?.(' ') ?? [];
            if (obj.renderHeader) {
                return (
                    <th
                        key={index}
                        rowSpan={!obj?.children ? 2 : 1}
                        className={`px-4 py-2 text-left text-sm font-medium text-gray-700 ${obj.stylesHeader || ''}`}
                    >
                        {obj.renderHeader}
                    </th>
                );
            }
            if (obj.onSort && dataList && dataList.length > 0) {
                return (
                    <th
                        key={index}
                        rowSpan={!obj?.children ? 2 : 1}
                        className={`px-4 py-2 text-sm text-left font-medium text-gray-700 ${obj.stylesHeader || ''} relative`}
                        style={{ width: columnWidths[obj.key as string] } as CSSProperties}
                    >
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => obj.onSort!(sort === `${obj.key} asc` ? `${obj.key} desc` : `${obj.key} asc`)}
                                className={`${(sortKey === obj.key) ? 'text-sky-600' : 'text-gray-700'} flex items-center space-x-2 hover:text-sky-600 transition-colors`}
                            >
                                {obj.title}
                                {(sortKey === obj.key) && (
                                    <span className={`ml-2 ${sortValue === 'asc' ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="h-5 w-5" />
                                    </span>
                                )}
                            </button>
                            {
                                (columns?.length !== index + 1) && (
                                    <div
                                        className="!w-[3px] h-full cursor-col-resize bg-gray-500 absolute top-0 right-0"
                                        onMouseDown={(e) => handleColumnResize(index, e)}
                                        onTouchStart={(e) => handleColumnResize(index, e)}
                                    ></div>
                                )
                            }
                        </div>
                    </th>
                );
            }
            return (
                <th
                    key={index}
                    rowSpan={!obj?.children ? 2 : 1}
                    colSpan={obj?.children?.length}
                    className={`px-4 py-2 text-left text-sm font-medium text-gray-700 relative
                        ${obj?.children ? 'text-center' : ''} 
                        ${obj.stylesHeader || ''}`}
                >
                    {obj.title}
                    {
                        (columns?.length !== index + 1) && (
                            <div className="!w-[3px] h-full cursor-col-resize bg-gray-500 absolute top-0 right-0"></div>
                        )
                    }
                </th>
            );
        });
    };

    const generateColumn = (): ReactNode => {
        if (error !== null) {
            return (
                <tr>
                    <td colSpan={99} className="text-center py-4 text-red-500">
                        {error?.message}
                    </td>
                </tr>
            );
        }
        if (dataList && dataList.length > 0) {
            let number = (params.page && params.size)
                ? (params.page > 1 ? ((params.page - 1) * params.size) + 1 : 1)
                : 1;
            return dataList.map((row, key) => {
                return (
                    <tr key={`row-${key}`} className="hover:bg-gray-50 border-b border-gray-300">
                        {showNumber ? <td className="px-4 py-2 text-sm text-gray-600">{number++}.</td> : null}
                        {columns.map((objColumn, keyColumn) => {
                            return renderColumn(objColumn, row, keyColumn);
                        })}
                    </tr>
                );
            });
        } else {
            return (
                <tr>
                    <td colSpan={99} className="text-center py-4 text-gray-500">
                        {customDataNotFoundMessage}
                    </td>
                </tr>
            );
        }
    };

    return (
        <div className="border border-t-3 border-t-red-400 border-gray-300 rounded-lg shadow-sm">
            <table ref={tableRef} className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                        {showNumber ? (
                            <th
                                className="px-4 relative py-2 text-sm text-left font-medium text-gray-700"
                                style={{ width: colNum } as CSSProperties}
                            >
                                No.
                                <div
                                    className="!w-[3px] h-full cursor-col-resize bg-gray-500 absolute top-0 right-0"
                                    onMouseDown={(e) => handleColumnResizeNums(e)}
                                ></div>
                            </th>
                        ) : null}
                        {generateResizableHeader()}
                    </tr>
                    <tr>
                        {generateChildren().map((item, index) => {
                            return <Fragment key={index + 1}>{item}</Fragment>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        (loading === 'resolved' || loading === 'error') ? generateColumn() : <TableLoader />
                    }
                </tbody>
            </table>
        </div >
    );
};

const TableLoader: React.FC = () => {
    return (
        <tr>
            <td colSpan={99} className="text-center py-4">
                <div className="inline-block h-8 w-8 animate-spin text-sky-300 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </td>
        </tr>
    );
};

export default Table;