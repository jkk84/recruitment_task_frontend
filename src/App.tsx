import { Button, Select, Space, Table, ConfigProvider } from 'antd';
import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import plPL from "antd/lib/locale/pl_PL";

interface TestTable {
    id: number;
    column1: string;
    column2: string;
    column3: string;
    column4: number;
}

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'kolumna1',
        dataIndex: 'column1',
        key: 'column1',
    },
    {
        title: 'kolumna2',
        dataIndex: 'column2',
        key: 'column2',
    },
    {
        title: 'kolumna3',
        dataIndex: 'column3',
        key: 'column3',
    },
    {
        title: 'kolumna4',
        dataIndex: 'column4',
        key: 'column4',
    },
];

interface Column {
    id: number;
    name: string;
}

const columnList: Column[] = [
    {
        id: 1,
        name: "kolumna1"
    },
    {
        id: 2,
        name: "kolumna2",
    },
    {
        id: 3,
        name: "kolumna3"
    },
    {
        id: 4,
        name: "kolumna4"
    }
]

function App() {

    const [duplicates, setDuplicates] = React.useState<TestTable[]>([]);
    const [uniques, setUniques] = React.useState<TestTable[]>([]);
    const [choosenColumn, setChoosenColumn] = React.useState<Column>();

    const { Option } = Select;

    const handleChange = (columnId: number) => {
        const choosen = columnList.find(value => value?.id === columnId)
        if (choosen) {
            setChoosenColumn(choosen);
        }
    }

    const getLists = async () => {
        const response = await fetch('/api/test-table/get-lists?columnName=' + choosenColumn?.name);
        const body = await response.json();
        if (body) {
            setDuplicates(body.duplicates)
            setUniques(body.uniques)
        }
    }

    return (
        <ConfigProvider locale={plPL}>
            <div className="App" style={{ marginTop: "2vw" }}>
                <Space direction={"horizontal"}>
                    <Select style={{ width: 200 }} onChange={handleChange} placeholder="Wybierz kolumne">
                        {columnList.map(obj => <Select.Option value={obj.id} key={obj.id}>{obj.name}</Select.Option>)}
                    </Select>
                    <Button type="primary" onClick={getLists} disabled={choosenColumn === undefined}>
                        Wykonaj
                    </Button>
                </Space>
                <Space direction={"horizontal"} style={{ width: "90vw", marginTop: "2vw" }}>
                    <Table size={"small"}
                        style={{ width: "45vw" }}
                        title={() => `Duplikaty`}
                        bordered
                        dataSource={duplicates}
                        columns={columns}
                    />

                    <Table size={"small"}
                        style={{ width: "45vw" }}
                        title={() => `Unikalne`}
                        bordered
                        dataSource={uniques}
                        columns={columns}
                    />
                </Space>
            </div>
        </ConfigProvider>
  );
}

export default App;
