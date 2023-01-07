import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from "@ant-design/pro-components";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const tableName = "director-data";

type tableType = {
  name: string;
  experiences: string;
  index: number;
};

type DataSourceType = {
  id: React.Key;
} & tableType;

const querySnapshot = await getDocs(collection(db, tableName));

const defaultData: DataSourceType[] = [];

querySnapshot.forEach((doc) => {
  const data = doc.data() as tableType;
  defaultData.push({
    ...data, experiences: data.experiences.replaceAll("\\n", "\n"),
    id: doc.id as React.Key,
  });
});

export default () => {
  function handleDelete(id: string) {
    const docRef = doc(db, tableName, id);
    deleteDoc(docRef).then(() => {
      console.log("Document successfully deleted!");
    });
  }

  function handleAdd(rowKey: any, data: DataSourceType, row: any) {
    addDoc(collection(db, tableName), {
      ...data,
      experiences: data.experiences.replaceAll("\n", "\\n")
      // id: rowKey,
    }).then(() => {
      console.log("Document successfully written!");
    });
  }

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">("top");

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "排序",
      tooltip: "數字越小越靠前",
      dataIndex: "index",
      valueType: "digit",
      sorter: (a, b) => a.index - b.index,
      defaultSortOrder: "ascend",
    },
    {
      title: "姓名職稱",
      dataIndex: "name",
      valueType: "text",
      width: "15%",
    },
    {
      title: "主要經歷",
      valueType: "textarea",
      tooltip: "如需換行請使用空白鍵",
      width: "60%",
      dataIndex: "experiences",
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          編輯
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
            handleDelete(record.id as string);
          }}
        >
          刪除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="財務資訊"
        maxLength={300}
        scroll={{
          x: 960,
        }}
        // @ts-ignore Error occurs when the props not adding questionmark
        recordCreatorProps={
          position !== "hidden"
            ? {
                position: position as "top",
                record: () => ({ id: Date.now() }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: "添加到頂部",
                value: "top",
              },
              {
                label: "添加到底部",
                value: "bottom",
              },
              {
                label: "隱藏",
                value: "hidden",
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            handleAdd(rowKey, data, row);
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格數據" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
