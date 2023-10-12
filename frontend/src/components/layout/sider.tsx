import { Nav } from '@douyinfe/semi-ui';
import {
  IconGithubLogo,
  IconSetting,
  IconDesktop,
  IconGridView,
  IconHistory,
  IconDuration,
  IconSun,
} from '@douyinfe/semi-icons';
import { BrowserOpenURL } from '@wailsApp/runtime';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Preferences from '@/components/settings/preferences';
import { motion, useAnimation } from 'framer-motion';

export default function Sider() {
  const navigator = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(['server']);
  const [settingsVisible, setSettingsVisible] = useState(false);
  useState(<IconDuration style={{ color: 'var(--semi-color-text-2)' }} size="large" />);
  const controlsSun = useAnimation();
  const controlsMoon = useAnimation();

  const navItems = [
    { itemKey: 'server', text: '服务器', icon: <IconDesktop /> },
    { itemKey: 'container', text: '容器', icon: <IconGridView /> },
    { itemKey: 'log', text: '日志', icon: <IconHistory /> },
  ];

  const switchMode = () => {
    const body = document.body;

    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
      controlsSun.start({ rotateY: 0 });
      controlsMoon.start({ rotateY: -180 });
    } else {
      body.setAttribute('theme-mode', 'dark');
      controlsSun.start({ rotateY: 180 });
      controlsMoon.start({ rotateY: 0 });
    }
  };

  const onNavSelect = (key: any) => {
    navigator('/' + key.itemKey);
    setSelectedKeys([key.itemKey]);
  };

  const onOpenGithub = () => {
    BrowserOpenURL('https://github.com/DLinkProjects/DLink');
  };

  const onOpenSetting = () => {
    setSettingsVisible(true);
  };

  return (
    <div className="flex flex-col h-[100%]">
      <div className="flex-grow">
        <Nav
          onClick={key => onNavSelect(key)}
          selectedKeys={selectedKeys}
          className="border-0"
          style={{ width: 59 }}
          items={navItems}
          isCollapsed={true}
          defaultIsCollapsed={true}
        />
      </div>
      <div className="pb-12 flex flex-col justify-center items-center">
        <motion.div
          whileHover={{ rotate: 360 }} // 当鼠标悬停在上面时放大1.5倍并旋转360度
          transition={{ duration: 0.5, ease: 'easeOut' }} // 过渡效果
          onClick={onOpenGithub}
          className="w-11 h-9 mt-2 flex justify-center items-center cursor-pointer"
        >
          <IconGithubLogo style={{ color: 'var(--semi-color-text-2)' }} size="large" />
        </motion.div>
        <div
          onClick={onOpenSetting}
          className="w-11 h-9 mt-2 flex justify-center items-center hover:bg-custom-hover rounded cursor-pointer"
        >
          <IconSetting style={{ color: 'var(--semi-color-text-2)' }} size="large" />
        </div>
        <div
          onClick={switchMode}
          className="w-11 h-9 mt-2 flex justify-center items-center hover:bg-custom-hover rounded cursor-pointer position-relative"
        >
          <motion.div
            animate={controlsSun}
            transition={{ duration: 1 }} // 设置动画持续时间为2秒
            className="absolute"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <IconSun style={{ color: 'var(--semi-color-text-2)' }} size="large" />
          </motion.div>

          <motion.div
            animate={controlsMoon}
            initial={{ rotateY: -180 }}
            transition={{ duration: 1 }} // 设置动画持续时间为2秒
            className="absolute"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <IconDuration style={{ color: 'var(--semi-color-text-2)' }} size="large" />
          </motion.div>
        </div>
      </div>
      <Preferences visible={settingsVisible} setVisible={setSettingsVisible} />
    </div>
  );
}