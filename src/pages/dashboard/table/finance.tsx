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

type DataSourceType = {
  id: React.Key;
  year?: number;
  quarter?: string;
  url?: string;
};

const querySnapshot = await getDocs(collection(db, "finance-data"));

const defaultData: DataSourceType[] = [];

querySnapshot.forEach((doc) => {
  defaultData.push({ ...doc.data(), id: doc.id });
});

// [
//   {
//     id: 0,
//     year: 107,
//     title: "Q1",
//     source:
//       "https://drive.google.com/uc?export=download&id=1pmNySLD38ZKCmGu0_MXinsdMI-DI1LSP",
//   },
// ];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<"top" | "bottom" | "hidden">(
    "bottom"
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "年份",
      dataIndex: "year",
      valueType: "digit",
    },
    {
      title: "季度",
      valueType: "select",
      key: "quarter",
      dataIndex: "quarter",
      valueEnum: {
        Q1: {
          text: "Q1",
        },
        Q2: {
          text: "Q2",
        },
        Q3: {
          text: "Q3",
        },
        合併財報: {
          text: "合併財報",
        },
        個體財報: {
          text: "個體財報",
        },
      },
    },
    {
      title: "檔案連結",
      valueType: "text",
      key: "url",
      dataIndex: "url",
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
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
            const docRef = doc(db, "finance-data", record.id.toString());
            deleteDoc(docRef).then(() => {
              console.log("Document successfully deleted!");
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={300}
        scroll={{
          x: 960,
        }}
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
                label: "添加到顶部",
                value: "top",
              },
              {
                label: "添加到底部",
                value: "bottom",
              },
              {
                label: "隐藏",
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
            addDoc(collection(db, "finance-data"), {
              ...data,
              id: rowKey,
            }).then(() => {
              console.log("Document successfully written!");
            });
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
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
