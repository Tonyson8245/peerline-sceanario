/**
 * 페이지 번호별 인증 필요 여부 매핑 테이블
 *
 * @property {string} auth - 'O': 인증 필요, 'X': 인증 불필요
 * @property {string} action - 'login': 로그인 페이지, 'guestLogin': 비회원 로그인 페이지, 'continue': 그대로 진행
 */
export const authPageMap = {
  // 2025.11.01 추가
  827 :{ auth: "X", action: "continue" }, // 
  918 :{ auth: "X", action: "continue" }, // 

  //
  1713: { auth: "X", action: "continue" }, // 메인 페이지
  1683: { auth: "X", action: "continue" }, // 메인 페이지
  1813: { auth: "X", action: "continue" }, // 전체 메뉴 페이지 // 비로그인
  1815: { auth: "X", action: "continue" }, // 전체 메뉴 페이지 // 로그인
  1829: { auth: "X", action: "continue" }, // 전체 메뉴 페이지 // 사업자 고객
  825: { auth: "X", action: "continue" }, // 로그인 페이지
  1604: { auth: "O", action: "login" },
  1397: { auth: "O", action: "login" },
  1130: { auth: "O", action: "login" },
  1606: { auth: "O", action: "login" },
  1745: { auth: "O", action: "login" },
  247: { auth: "O", action: "login" },
  967: { auth: "O", action: "login" },
  988: { auth: "O", action: "login" },
  1034: { auth: "O", action: "login" },
  1054: { auth: "O", action: "login" },
  1056: { auth: "O", action: "login" },
  1059: { auth: "O", action: "login" },
  1070: { auth: "O", action: "login" },
  1122: { auth: "O", action: "login" },
  1126: { auth: "X", action: "continue" },
  1128: { auth: "X", action: "continue" },
  1396: { auth: "O", action: "guestLogin" },
  287: { auth: "O", action: "guestLogin" },
  316: { auth: "O", action: "guestLogin" },
  385: { auth: "O", action: "guestLogin" },
  407: { auth: "O", action: "guestLogin" },
  1377: { auth: "O", action: "guestLogin" },
  1389: { auth: "O", action: "guestLogin" },
  1459: { auth: "O", action: "login" },
  1512: { auth: "O", action: "login" },
  1519: { auth: "O", action: "login" },
  1527: { auth: "O", action: "login" },
  1539: { auth: "O", action: "login" },
  1550: { auth: "O", action: "login" },
  1559: { auth: "O", action: "login" },
  1562: { auth: "X", action: "continue" },
  1566: { auth: "X", action: "continue" },
  1570: { auth: "X", action: "continue" },
  1571: { auth: "X", action: "continue" },
  1572: { auth: "X", action: "continue" },
  1573: { auth: "X", action: "continue" },
  1576: { auth: "X", action: "continue" },
  1577: { auth: "X", action: "continue" },
  1578: { auth: "X", action: "continue" },
  1579: { auth: "X", action: "continue" },
  1580: { auth: "X", action: "continue" },
  1583: { auth: "X", action: "continue" },
  1584: { auth: "X", action: "continue" },
  1587: { auth: "X", action: "continue" },
  1586: { auth: "X", action: "continue" },
  1585: { auth: "X", action: "continue" },
  1589: { auth: "X", action: "continue" },
  1591: { auth: "X", action: "continue" },
  1596: { auth: "O", action: "login" },
  1599: { auth: "O", action: "login" },
  1601: { auth: "O", action: "login" },
  1609: { auth: "O", action: "login" },
  1611: { auth: "O", action: "login" },
  1613: { auth: "O", action: "login" },
  1616: { auth: "O", action: "login" },
  1625: { auth: "O", action: "login" },
  1633: { auth: "O", action: "login" },
  1649: { auth: "O", action: "login" },
  1651: { auth: "O", action: "login" },
  1653: { auth: "O", action: "login" },
};
