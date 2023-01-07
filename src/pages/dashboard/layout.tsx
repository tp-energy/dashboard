import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import ProCard from "@ant-design/pro-card";
import { PageContainer, ProLayout } from "@ant-design/pro-layout";
import { Button, Input } from "antd";
import { useState } from "react";
import defaultProps from "./_defaultProps";
import Finance from "./table/finance";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Director from "./table/director";
import Meeting from "./table/meeting";
import Holder from "./table/holder";
import MeetingData from "./table/meetingData";
import Explaination from "./table/explaination";
import Management from "./table/management";
import Regulation from "./table/regulation";
import Welcome from "./Welcome";

export default () => {
  const [pathname, setPathname] = useState("/list/sub-page/sub-sub-page1");

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // console.log("Sign out successful");
        alert("成功登出")
      })
      .catch((err) => {
        console.log("Sign out failed", err);
      });
  }

  return (
    <ProLayout
      splitMenus
      token={{
        colorBgAppListIconHover: "rgba(0,0,0,0.06)",
        colorTextAppListIconHover: "rgba(255,255,255,0.95)",
        colorTextAppListIcon: "rgba(255,255,255,0.85)",
        sider: {
          colorBgCollapsedButton: "#fff",
          colorTextCollapsedButtonHover: "rgba(0,0,0,0.65)",
          colorTextCollapsedButton: "rgba(0,0,0,0.45)",
          colorMenuBackground: "#004FD9",
          colorBgMenuItemCollapsedHover: "rgba(0,0,0,0.06)",
          colorBgMenuItemCollapsedSelected: "rgba(0,0,0,0.15)",
          colorMenuItemDivider: "rgba(255,255,255,0.15)",
          colorBgMenuItemHover: "rgba(0,0,0,0.06)",
          colorBgMenuItemSelected: "rgba(0,0,0,0.15)",
          colorTextMenuSelected: "#fff",
          colorTextMenuItemHover: "rgba(255,255,255,0.75)",
          colorTextMenu: "rgba(255,255,255,0.75)",
          colorTextMenuSecondary: "rgba(255,255,255,0.65)",
          colorTextMenuTitle: "rgba(255,255,255,0.95)",
          colorTextMenuActive: "rgba(255,255,255,0.95)",
          colorTextSubMenuSelected: "#fff",
        },
      }}
      {...defaultProps}
      logo="./logo.svg"
      title="天方能源後台"
      location={{
        pathname,
      }}
      avatarProps={{
        src: "./logo.svg",
        size: "small",
        title: auth.currentUser?.email,
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          props.layout !== "side" ? (
            <div
              key="SearchOutlined"
              aria-hidden
              style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Input
                style={{
                  borderRadius: 4,
                  marginInlineEnd: 12,
                  backgroundColor: "rgba(0,0,0,0.03)",
                }}
                prefix={
                  <SearchOutlined
                    style={{
                      color: "rgba(0, 0, 0, 0.15)",
                    }}
                  />
                }
                placeholder="搜索方案"
                bordered={false}
              />
              <PlusCircleFilled
                style={{
                  color: "var(--ant-primary-color)",
                  fontSize: 24,
                }}
              />
            </div>
          ) : undefined,
          // <InfoCircleFilled key="InfoCircleFilled" />,
          // <QuestionCircleFilled key="QuestionCircleFilled" />,
          // <GithubFilled key="GithubFilled" />,
        ];
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <p
            style={{
              textAlign: "center",
              paddingBlockStart: 12,
            }}
          >
            Power by TPEnergy
          </p>
        );
      }}
      onMenuHeaderClick={(e) => console.log(e)}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || "/welcome");
            // console.log(item, dom)
          }}
        >
          {dom}
        </a>
      )}
    >
      <PageContainer
        extra={[
          // <Button key="3">操作</Button>,
          // <Button key="2">操作</Button>,
          <Button type="primary" key="1" onClick={handleLogout}>
            登出
          </Button>,
        ]}
        // footer={[
        //   <Button key="3">重置</Button>,
        //   <Button key="2" type="primary">
        //     提交
        //   </Button>,
        // ]}
      >
        <ProCard
          style={{
            height: "200vh",
            minHeight: 800,
          }}
        >
          <>
            {pathname === "/list/sub-page/sub-sub-page1" && <Welcome />}
            {pathname === "/list/stakeholders/finance" && <Finance />}
            {pathname === "/list/stakeholders/dac-members" && <Director />}
            {pathname === "/list/stakeholders/meeting-info" && <Meeting />}
            {pathname === "/list/stakeholders/holder-members" && <Holder />}
            {pathname === "/list/stakeholders/meeting-data" && <MeetingData />}
            {pathname === "/list/stakeholders/explaination" && <Explaination />}
            {pathname === "/list/stakeholders/maintainance-data" && <Management />}
            {pathname === "/list/stakeholders/regulation-data" && <Regulation />}
            
          </>
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};
