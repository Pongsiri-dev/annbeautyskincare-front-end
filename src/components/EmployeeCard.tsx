// @mui
import { Stack, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { UserAbout } from "src/@types/user";
import styled from "styled-components";
import { PDFExport } from "@progress/kendo-react-pdf";
// @types
// components

// ----------------------------------------------------------------------
const customStylesLogo = {
  margin: {
    right: '4%',
  },
};

const WrapperStyle = styled.div`
  width: 100%;
  box-shadow: 0 0 2px 0 rgb(145 158 171 / 20%),
    0 12px 24px -4px rgb(145 158 171 / 12%);
  border-radius: 16px;
  overflow: hidden;

  @font-face {
    font-family: Linearicons;
    src: url(/fonts/card/Linearicons-Free.ttf);
  }
  @font-face {
    font-family: Kanit-Bold;
    src: url(/fonts/card/Kanit-Bold.ttf);
  }
  @font-face {
    font-family: Kanit-ExtraBold;
    src: url(/fonts/card/Kanit-ExtraBold.ttf);
  }
  @font-face {
    font-family: Kanit-Light;
    src: url(/fonts/card/Kanit-Light.ttf);
  }
  @font-face {
    font-family: Kanit-SemiBold;
    src: url(/fonts/card/Kanit-SemiBold.ttf);
  }
  @font-face {
    font-family: Kanit-Regular;
    src: url(/fonts/card/Kanit-Regular.ttf);
  }
  @font-face {
    font-family: DB-Heavent-Cond;
    src: url(/fonts/card/DB-Heavent-Cond.ttf);
  }
  @font-face {
    font-family: DB-Heavent-Cond;
    font-weight: bold;
    src: url(/fonts/card/DB-Heavent-Bd-Cond.ttf);
  }
  /* 
img-fluid d-block mx-auto 
*/
  @media only screen and (max-width: 991px) {
    /* MOBILE */
    .mb-x {
      display: none !important;
    }
  }
  @media only screen and (min-width: 992px) {
    /* PC */
    .pc-x {
      display: none !important;
    }
  }

  a:hover {
    text-decoration: none;
  }
  /* MAIN START CSS */

  h5,
  h6 {
    font-weight: 400;
  }

  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }

  .card-text:last-child {
    margin-bottom: 0;
  }

  .col {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }

  .bg-card {
    background-color: #fff;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
  .card {
    height: 350px;
    width: 595px;
    display: block;
    margin: 0 auto;
    border-radius: 20px;
    position: relative;
  }
  .card.platinum.front {
    background: url(/company/curve1x.png), url(/company/thl.png),
      url(/company/thr.png), linear-gradient(to right, #0a0a0c, #202020);
    background-position: center 65%, 2% 5%, 98% 5%, 100% 100%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-size: 100% auto, 80px, 80px, 100% 100%;
  }
  .card.platinum.front .logo {
    display: block;
    margin-top: 30px;
    margin-right: initial;
    max-height: 120px;
  }
  .card.platinum.front h5 {
    font-size: 30px;
    position: absolute;
    bottom: 0;
    margin-bottom: 55px;
    color: #a29358;
    text-align: center;
    width: 100%;
    justify-content: center;
    font-family: DB-Heavent-Cond;
  }
  .card.platinum.front h6 {
    font-size: 30px;
    position: absolute;
    bottom: 0;
    margin-bottom: 25px;
    color: #a29358;
    text-align: center;
    width: 100%;
    justify-content: center;
    font-family: DB-Heavent-Cond;
  }

  .card.platinum.back {
    background: url(/company/curve3.png), url(/company/botl.png),
      url(/company/botr.png), linear-gradient(to right, #fff, #fff);
    background-position: center top, 2% 95%, 98% 95%, 100% 100%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-size: 100% auto, 50px, 50px, 100% 100%;
  }

  .card.platinum.back {
    padding: 80px 30px 30px 45px;
  }
  .card.platinum.back h2 {
    font-size: 30px;
    color: #f0e68d;
    font-family: DB-Heavent-Cond;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 0px;
  }
  .card.platinum.back h3 {
    font-size: 24px;
    color: #f0e68d;
    font-family: DB-Heavent-Cond;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 25px;
  }
  .card.platinum.back h5 {
    font-size: 22px;
    color: #f0e68d;
    font-family: DB-Heavent-Cond;
    text-transform: uppercase;
    font-weight: bold;
    width: 50%;
    display: block;
    margin-bottom: 15px;
  }
  .card.platinum.back h5 span {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 17px;
    color: #000;
    font-family: DB-Heavent-Cond;
    border-bottom: 1px solid #f0e68d;
    flex-grow: 1;
  }

  .card.platinum.back h6 {
    font-size: 18px;
    color: #f0e68d;
    font-family: DB-Heavent-Cond;
    text-transform: uppercase;
    font-weight: bold;
    width: 33%;
    display: flex;
    margin-bottom: 15px;
    padding: 0 5px;

    & > span {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card.platinum.back h6 span {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 22px;
    color: #000;
    font-family: DB-Heavent-Cond;
    border-bottom: 1px solid #f0e68d;
    flex-grow: 1;
  }
  .card.platinum.back .card-text {
    display: flex;
    flex-wrap: wrap;
  }

  .card.platinum.back .card-text img {
    max-height: 28px;
    margin-right: 5px;
  }

  /* ------------------------------------ gold-card ------------------------------------ */

  .card.card-type.gd.front {
    border-bottom: 30px solid #ffdc14;
  }
  .card.card-type.gd.back {
    border-bottom: 30px solid #ffdc14;
  }
  .card.card-type.sv.front {
    border-bottom: 30px solid #ededeb;
  }
  .card.card-type.sv.back {
    border-bottom: 30px solid #ededeb;
  }
  .card.card-type.cl.front {
    border-bottom: 30px solid #0f562c;
  }
  .card.card-type.cl.back {
    border-bottom: 30px solid #0f562c;
  }

  .card.card-type.front {
    background: linear-gradient(to right, #081929, #163c55);
    background-position: center center, 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 100% 100%, 100%;
    border-radius: 20px !important;
  }
  .card.card-type.front .logo {
    margin-right: initial;
    max-height: 120px;
    display: block;
    margin-top: 20px;
  }
  .card.card-type.front h5 {
    font-size: 30px;
    position: absolute;
    bottom: 0;
    margin-bottom: 45px;
    color: #84673f;
    text-align: center;
    width: 100%;
    justify-content: center;
    font-family: DB-Heavent-Cond;
  }

  .card.card-type.front h6 {
    font-size: 26px;
    position: absolute;
    bottom: 0;
    margin-bottom: 15px;
    color: #84673f;
    text-align: center;
    width: 100%;
    justify-content: center;
    font-family: DB-Heavent-Cond;
  }

  .card.card-type.back {
    background: linear-gradient(to right, #081929, #163c55);
    background-position: center center, 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 100% 100%, 100%;
    border-radius: 20px !important;
  }

  .card.card-type.back {
    padding: 30px 30px 30px 45px;
  }
  .card.card-type.back h2 {
    margin-bottom: 4px;
  }
  .card.card-type.back h2 span {
    font-size: 36px;
    color: #84673f;
    font-family: DB-Heavent-Cond;
    padding-bottom: 3px;
    border-bottom: 2px solid #84673f;
  }
  .card.card-type.back h6 {
    font-size: 20px;
    margin-top: 10px;
    color: #84673f;
    font-family: DB-Heavent-Cond;
    padding-bottom: 3px;
  }

  .card.card-type.back .logo {
    max-width: 180px;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 15px;
    margin-bottom: 15px;
  }

  .card ul {
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
  }
  .card ul li {
    font-size: 24px;
    margin-bottom: 0px;
    color: #84673f;
    font-family: DB-Heavent-Cond;
    width: 50%;
    margin-top: 10px;
    display: flex;
  }

  .card ul li p {
    width: 70px;
    margin-bottom: 0px;
  }

  .card ul li img {
    max-height: 28px;
  }

  @media only screen and (max-width: 991px) {
    /* MOBILE */
    .card {
      width: 100%;
      height: 200px;
    }
    .bg-card {
      padding: 15px;
    }
    .card.platinum.front {
      background-size: 100% auto, 50px, 50px, 100% 100%;
    }
    .card.platinum.front .logo {
      max-height: 80px;
      margin-top: 10px;
    }
    .card.platinum.front h5 {
      font-size: 20px;
      margin-bottom: 30px;
    }
    .card.platinum.front h6 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .card.platinum.back {
      padding: 40px 20px 10px 25px;
    }
    .card.platinum.back h2 {
      font-size: 24px;
    }
    .card.platinum.back h3 {
      font-size: 20px;
      margin-bottom: 0px;
    }
    .card.platinum.back h5 {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .card.platinum.back h5 span {
      font-size: 14px;
      padding-left: 10px;
      padding-right: 5px;
    }
    .card.platinum.back h6 {
      font-size: 14px;
      padding-right: 5px;
    }
    .card.platinum.back h6 span {
      font-size: 16px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .card.platinum.back .card-text img {
      max-height: 15px;
      margin-left: 2px;
    }
    .card.card-type.front .logo {
      max-height: 120px;
      margin-top: 5px;
    }
    .card.card-type.front h5 {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .card.card-type.back {
      padding: 10px 15px 15px 20px;
    }
    .card.card-type.back h2 span {
      font-size: 24px;
      border-bottom: 2px solid #84673f;
    }
    .card.card-type.back h6 {
      font-size: 13px;
    }
    .card ul li {
      font-size: 16px;
      margin-top: 0px;
    }
    .card ul li img {
      max-height: 16px;
    }
    .card ul li p {
      width: 48px;
      margin-bottom: 0px;
    }
    .card.card-type.back .logo {
      max-width: 120px;
      position: absolute;
      right: 0;
      top: 0;
      margin-right: 5px;
      margin-top: 30px;
    }
  }
  @media only screen and (width: 768px) {
    /* IPAD */
    .card {
      height: 350px;
      width: 595px;
    }
  }
  @media only screen and (min-width: 992px) {
    /* PC */
    .pc-x {
      display: none !important;
    }
  }
`;

type Props = {
  profile: UserAbout;
};

export default function EmployeeCard({ profile }: Props) {
  const {
    firstName,
    lastName,
    level,
    telephone,
    email,
    address,
    amphur,
    tombon,
    province,
    postCode,
  } = profile;

  const pdfExportComponent = useRef(null);

  const [type, setType] = useState<string>("");

  useEffect(() => {
    switch (level) {
      case "Gold":
        setType("gd");
        break;
      case "Silver":
        setType("sv");
        break;
      default:
        setType("cl");
    }
  }, [level]);

  const handleExportWithComponent = () => {
    const { current }: any = pdfExportComponent;
    if (current) {
      current.save();
    }
  };

  return (
    <WrapperStyle>
      <Stack justifyContent="center">
        <Button onClick={handleExportWithComponent}>Export Card</Button>
      </Stack>
      <PDFExport ref={pdfExportComponent} fileName="member-card">
        {level === "Platinum" ? (
          <div className="col bg-card">
            <div className="card platinum front">
              <img src="/company/IMG-3075.png" className="logo"/>
              <h5>บริษัท 776/112 พัฒนาการ38 หมู่บ้านเดอะคอนเนค </h5>
              <h6>
                โทร <span>0955542399, 0886659142</span>
              </h6>
            </div>

            <br />

            <div className="card platinum back">
              <h2>super dealer</h2>
              <h3>ชุปเปอร์ ดีลเลอร์ วาเลนต้า คอฟฟี่ </h3>
              <div className="card-text">
                <h5>
                  Name
                  <span>
                    {firstName} {lastName}
                  </span>
                </h5>
                <h5>
                  รหัส <span> xxxx xxxxxx</span>
                </h5>
                <h5>
                  สายงาน <span> xxxx xxxxxx</span>
                </h5>
                <h5>
                  เบอร์โทร <span> {telephone}</span>
                </h5>
              </div>
              <div className="card-text">
                <h6>
                  <img src="/company/facebook.png" alt="" />{" "}
                  <span> xxxx xxxxxx</span>
                </h6>
                <h6>
                  <img src="/company/line1.png" alt="" />{" "}
                  <span> xxxx xxxxxx</span>
                </h6>
                <h6>
                  <img src="/company/instagram.png" alt="" />{" "}
                  <span> xxxx xxxxxx</span>
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="col bg-card">
            <div className={type + " card card-type front"}>
              <img src="/company/IMG-3075.png" className="logo" />
              <h5>บริษัท 776/112 พัฒนาการ38 หมู่บ้านเดอะคอนเนค </h5>
              <h6>
                โทร <span>0955542399, 0886659142</span>
              </h6>
            </div>
            <br />
            <div className={type + " card card-type back"}>
              <img src="/company/IMG-5218.png" className="logo" />
              <h2>
                <span>
                  คุณ {firstName} {lastName}
                </span>
              </h2>
              <h6>ชุปเปอร์ ดีลเลอร์ โกล วาเลนต้า คอฟฟี่ </h6>
              <ul>
                <li>
                  <p>สายงาน </p>
                  <span>xxxxx</span>
                </li>
                <li>
                  <p>
                    <img src="/company/facebook.png" alt="" />{" "}
                  </p>
                  <span>xxxxx</span>
                </li>
                <li>
                  <p>รหัส </p>
                  <span>xxxxx</span>
                </li>
                <li>
                  <p>
                    <img src="/company/line1.png" alt="" />{" "}
                  </p>
                  <span>xxxxx</span>
                </li>
                <li>
                  <p>เบอร์โทร </p>
                  <span>{telephone}</span>
                </li>
                <li>
                  <p>
                    <img src="/company/instagram.png" alt="" />{" "}
                  </p>
                  <span>xxxxx</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </PDFExport>
    </WrapperStyle>
  );
}
