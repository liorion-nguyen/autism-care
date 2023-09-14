import { Column, Text, useTheme } from "native-base";
import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { IUserProfile } from "../types/user";

type WrapperInfoProps = { contents: string[] };
const WrapperInfo = ({ contents }: WrapperInfoProps) => {
  return (
    <Column flex="1" p="4" space="3">
      {contents.map((text) => (
        <Text color="white" key={text}>
          {text}
        </Text>
      ))}
    </Column>
  );
};

type Props = {
  doctor: IUserProfile;
};
export default function DoctorInfoTabs({ doctor }: Props) {
  const { colors } = useTheme();
  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    intro: () => <WrapperInfo contents={doctor.intro!} />,
    expertises: () => <WrapperInfo contents={doctor.expertises!} />,
    services: () => <WrapperInfo contents={doctor.services!} />,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "intro", title: "Giới thiệu" },
    { key: "expertises", title: "Kinh nghiệm" },
    { key: "services", title: "Dịch vụ" },
  ]);

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: colors.coolGray[600] }}
          activeColor={colors.primary[600]}
          indicatorStyle={{ backgroundColor: colors.primary[600] }}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
