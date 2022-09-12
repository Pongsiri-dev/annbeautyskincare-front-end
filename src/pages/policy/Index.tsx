// @mui
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";

// hooks
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { PATH_AUTH } from "src/routes/paths";
import { useLocation, useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Image from "src/components/Image";
// sections

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const Span = styled("span")(() => ({
  color: "red",
  textDecoration: "underline",
  marginLeft: "5px",
}));

const flex = {
  display: "flex",
  justifyContent: "center",
};

const actionsContainer = {
  padding: "1rem 0",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

// ----------------------------------------------------------------------

export default function Policy() {
  const { method } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const isRegister = query.get("p");

  const [isAccept, setIsAccept] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  const onSubmit = () => {
    navigate(PATH_AUTH.register);
  };

  return (
    <Page title="Policy">
      <RootStyle>
        <Container maxWidth="md" style={flex}>
          <Grid item sm={10} md={12}>
            <Stack alignItems="center" sx={{ mt: 5 }}>
              <Image
                style={{ width: "100px", height: "100px" }}
                src="/company/IMG-3075.png"
              />
            </Stack>

            <Typography variant="h4" sx={{ mt: 1, textAlign: "center" }}>
              กฎและข้อบังคับสำหรับตัวแทนจำหน่ายแบรนด์
            </Typography>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              VALENTA ภายใต้บริษัท Ann Beautiful Skin Care จำกัด
            </Typography>
            <ol>
              <li>
                <Typography variant="body2" sx={{ mt: 3 }}>
                  “ตัวแทนจำหน่าย” หมายถึง ผู้ใดซึ่งได้สมัครตามขั้นตอนของ
                  บริษัทฯครบถ่วน เพื่อเสนอขายสินค้า แบรนด์ VALENTA ภายใต้ บริษัท
                  Ann Beautiful Skin Care จำกัด
                  และสามารถนำสื่อโฆษณาต่างๆไปใช้ในการเสนอขายสินค้าได้
                  ยังรวมถึงสามารถรับสิทธิประโยชน์ต่างๆ ตามที่ บริษัทฯกำหนด
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ผู้สมัครเป็นตัวแทนจำหน่ายสินค้าแบรนด์ Valenta ภายใต้ บริษัท
                  Ann Beautiful Skin Care จำกัด ต้องมีอายุ ไม่ต่ำกว่า 18
                  ปีบริบูรณ์
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ผู้สมัครเป็นตัวแทนจำหน่ายสินค้าแบรนด์ Valenta ภายใต้บริษัท Ann
                  Beautiful Skin Care จำกัด ต้องมียอดสั่งซื้อสินค้าขั้นต่ำ 30
                  ชิ้นขึ้นไป
                  จึงจะได้รหัสตัวแทนจำหน่ายและหากมียอดการสั่งจองสินค้าแล้วนั้นผู้สั่งจองต้องรับผิดชอบต่อยอดการสั่งสินค้านั้นเต็มจำนวนตามที่มีการสั่งจองสินค้าข้างต้น
                  หากมีความจำเป็นต้องยกเลิกยอดการสั่งจองสินค้าก่อนปิดการจองหรือก่อนสั่งยอด
                  ให้ตัวแทนแจ้งต่อบริษัทผ่านต้นสายงานของตัวเอง
                  เนื่องจากการกระทำดังกล่าวอาจส่งผลกระทบและสร้างความเสียหายต่อต้นสาย
                  (ตัวแทนรายใหญ่)
                  หากการกระทำที่ละเมิดกฎในข้างต้นจะถือเป็นการกระทำผิดต่อสัญญาฉบับนี้ในกรณีที่ตัวแทนจำหน่ายที่สั่งจองสินค้าได้ทำการชาระค่ามัดส่วนหน้าแล้วนั้นหากทำการยกเลิกทางบริษัทฯจะไม่คืนยอดมัดจำที่ชำระแล้วข้างต้นและไม่รับผิดชอบต่อการกระทำใดๆที่ละเมิดข้างต้นทั้งหมด
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย ต้องกำหนดราคาขายในราคาที่บริษัทฯกำหนดเท่านั้น
                  ทั้งในกรณีค้าปลีกและค้าส่งแก่ลูกค้า
                  การจำหน่ายสินค้าที่ต่ำกว่าราคาขายที่บริษัทฯกำหนด
                  ถือว่าเป็นการขายตัดราคา ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  <Span>
                    หากตัวแทนจำหน่ายคนใดฝ่าฝืนจะต้องโดนปรับ 500,000 บาท
                  </Span>
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่ายที่นำสินค้าของบริษัทฯไปจำหน่ายในช่องทางดังต่อไปนี้
                  Market pageLazada,Shopee,Alibaba หรือเว็บไซด์
                  และสื่อออนไลน์อื่น ยกเว้น Facebook,LINE
                  หากกระทำการไปเพื่อการขายตัดราคาตัวแทนรายอื่น
                  ถือว่าเป็นการขายตัดราคา ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  <Span>
                    หากตัวแทนจำหน่ายคนใดฝ่าฝืนจะต้องโดนปรับ 500,000 บาท
                  </Span>
                </Typography>
                <Typography variant="body2">
                  &emsp;
                  <u>
                    <b>ยกเว้น</b>
                  </u>
                  &emsp;
                  ตัวแทนจำหน่ายได้ทำการเซ็นสัญญาขายต่อบริษัทและต้องปฏิบัติกฎที่บริษัทฯกำหนดเท่านั้นโดยขั้นตอนในการเตรียมอกสารดังนี้
                  สำเนาบัตรประชาชน,สำเนาทะเบียนบ้าน,ชื่อร้าน,รหัสตัวแทนจำหน่ายและช่องทางการจำหน่ายของตัวแทนจำหน่ายนั้น
                  รวมไปถึงรหัสตัวแทนต้นสาย(ตัวแทนรายใหญ่)ผ่านทางลิงค์ที่ทางบริษัทกำหนดให้
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย
                  จะไม่กระทำการสับเปลี่ยนต้นสาย(ตัวแทนรายใหญ่)ที่รับสินค้าเนื่องจากการกระทำดังกล่าวจะส่งผลกระทบต่อรหัสสายงานในระบบของบริษัทฯ
                </Typography>
                <Typography variant="body2">
                  &emsp;เว้นแต่ตัวแทนจำหน่ายนั้นจะได้รับการยินยอมจากต้นสาย(ตัวแทนรายใหญ่)เดิมรวมถึงต้นสาย(ตัวแทนรายใหญ่)ใหม่
                  และการยินยอมจากบริษัทฯ
                  ในกรณีที่ตัวแทนจำหน่ายสับเปลี่ยนต้นสายโดยพลการ
                  ต้นสาย(ตัวแทนรายใหญ่)เดิม
                  สามารถเรียกร้องต่อบริษัทฯเพื่อให้พิจารณาการกระทำดังกล่างต่อไป
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย จะต้องปฏิบัติตามรายการ
                  การส่งเสริมที่ทางบริษัทฯกำหนดไว้เท่านั้นโดยจะไม่ทำการจัดโปรโมชั่น
                  ลด แลก จ่าย แถม
                  ใดๆที่นอกเหนือจากบริษัทฯกำหนดหากตัวแทนจำหน่ายคนใด
                  กระทำการฝ่าฝืน ถือว่าเป็นการขายตัดราคา
                  ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  <Span>
                    หากตัวแทนจำหน่ายคนใดฝ่าฝืนจะต้องโดนปรับ 500,000 บาท
                  </Span>
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย มีหน้าที่ชี้แจง,รายละเอียด,ราคา,สรรพคุณ
                  และคุณสมบัติที่ถูกต้องเกี่ยวกับสินค้าตามที่กฎหมายและบริษัทฯกำหนด
                  และไม่ทำการอวดอ้างสรรพคุณสินค้าเกินความเป็นจริง
                  จนเป็นเหตุให้ผู้บริโภคเข้าใจผิดจากสาระสำคัญของสินค้า
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย จะไม่ทำการจูงใจ ซักนำ หรือบังคับขู่เข็น
                  เพื่อให้ตัวแทนจำหน่ายรายอื่นหรือผู้บริโภค
                  ซื้อสินค้าจนเกินความจำเป็นหรือเกินความต้องการ
                  และในการนำเสนอสินค้าของตัวแทนจำหน่ายจะต้องแสดงบัตรตัวแทนหรือรหัสตัวแทนจำหน่ายให้แก่
                  ตัวแทนจำหน่ายรายใหม่ และผู้บริโภคโดยประจักษ์
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่าย
                  จะไม่ทำการนำชื่อเจ้าของแบรนด์หรือเครื่องหมายทางการค้าของบริษัทฯไปกระทำการแอบอ้าง
                  หรือจดทะเบียนซ้อนใดๆ รวมถึงห้ามแอบอ้างตนเป็นบริษัท
                  ไม่ว่าทางใดก็ตาม อาทิเช่น การสร้าง PageFacebook หรือ Profile
                  Facebook
                  และสื่อออนไลน์อื่นๆที่จงใจทำให้คล้ายหรือเหมือนบริษัททำให้ผู้บริโภคเกิดความเข้าใจคลาดเคลื่อน
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่ายต้องไม่นำสินค้าภายในแบรนด์ Valenta
                  ไปจำหน่ายให้ร้านค้าขายส่งที่มีการวางขายตัดราคาทุกร้านที่ทางแบรนด์ห้าม
                  และรวมถึงร้านค้าขายส่งรายอื่นที่ได้กระทำในทำนองเดียวกันนั้นด้วย
                  ตัวแทนจำหน่ายรายใดฝ่าฝืน
                  ถือว่าตัวแทนจำหน่ายรายนั้นเป็นผู้สนับสนุนให้เกิดการขายตัดราคา
                  ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  <Span>
                    หากตัวแทนจำหน่ายคนใดฝ่าฝืนจะต้องโดนปรับ 500,000 บาท
                  </Span>
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ห้ามบุคคลภายนอกที่ไม่มีรหัสตัวแทนถูกต้องหรือไม่ใช่ตัวแทนจำหน่ายของแบรนด์นำสินค้าภายในแบรนด์
                  Valenta ไปจำหน่ายให้ผู้บริโภค
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่ายคนใดกระทำการฝ่าฝืนกฎ ขายตัดราคา
                  ตัวแทนแทนจำหน่ายเหนือขึ้นมาหนึ่งชั้น(ผู้แนะนำ)
                  ต้องรับผิดชอบในการกระทำของลูกทีมตนด้วย
                  ถือได้ว่ากระทำการละเลยให้มีการขายตัดราคา
                  ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  ตัวแทนแทนจำหน่ายเหนือขึ้นมาหนึ่งชั้น(ผู้แนะนำ) จะต้องโดนปรับ
                  300,000 บาท
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่ายคนใดกระทำการฝ่าฝืนกฎ ขายตัดราคา
                  ตัวแทนแทนจำหน่ายเหนือขึ้นมาสองชั้น
                  ต้องรับผิดชอบในการกระทำของลูกทีมตนด้วย
                  ถือได้ว่ากระทำการละเลยให้มีการขายตัดราคา
                  ส่งผลกระทบร้ายแรงต่อระบบตัวแทนจำหน่าย
                  และรวมถึงการดำเนินธุรกิจโดยรวมของบริษัทด้วย
                  ตัวแทนแทนจำหน่ายเหนือขึ้นมาสองชั้น จะต้องโดนปรับ 100,000 บาท
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                ตัวแทนจำหน่ายที่ ทำผิดกฎแบบร้ายแรง แล้วถูกยกเลิกบัตรตัวแทน โดยทางบริษัทเป็นคนตัดบัตรตัวแทนจำหน่าย
                ทางบริษัทจะไม่ขอรับสินค้าคืน ใดๆทั้งสิ้น เนื่องจากถือว่า บุคคลนั้นทำผิดต้อง บริษัทก่อน ทางบริษัทจึงไม่ขอรับผิดชอบในส่วนของตรงนี้
                </Typography>
              </li>
            </ol>

            <Typography variant="h6" sx={{ mt: 3 }}>
              <Span sx={{ ml: 0 }}>ขั้นตอนการลงโทษ</Span>
            </Typography>
            <ol>
              <li>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  ตัวแทนจำหน่ายคนใดกระทำการฝ่าฝืนกฎ
                  ทางบริษัทฯจะทำการตักเตือนก่อน 1ครั้ง
                  ไม่ว่าจะเป็นการตักเตือนผ่านตัวแทนต้นสาย(ตัวแทนรายใหญ่)
                  หรือเป็นการตักเตือนโดยตรงจากทางบริษัทฯเอง
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  ตัวแทนจำหน่ายคนใดที่ถูกตักเตือนแล้วต้องทำการแก้ไขทันที
                  หากภายใน 15 วัน ยังไม่มีการแก้ไข
                  ทางบริษัทฯจะดำเนินขั้นเด็ดขาดต่อไป
                </Typography>
              </li>
            </ol>

            <Typography variant="h6" sx={{ m: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 15 }}
                alignContent={"center"}
                alignSelf={"center"}
                textAlign={"center"}
              >
                <Stack
                  direction={{ xs: "column", sm: "column" }}
                  spacing={{ xs: 3, sm: 2 }}
                  fontSize={13}
                  alignSelf={"center"}
                >
                  <img src="/company/a.jpg" width={190} alt="a" />
                  <label>
                    ประธานบริษัท <br />
                    แอนบิ้วตี้ฟูล สกินแคร์ จำกัด
                  </label>
                  <label>(นางสาวศิรินภา เพ็ชร์สุข)</label>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "column" }}
                  spacing={{ xs: 3, sm: 2 }}
                  fontSize={13}
                  alignSelf={"center"}
                >
                  <img src="/company/b.jpg" width={190} alt="b" />
                  <label>
                    กรรมการบริษัท <br />
                    แอนบิวตี้ฟูล สกินแคร์ จำกัด{" "}
                  </label>
                  <label>(นายวัชริศ ผุดผาด)</label>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "column" }}
                  spacing={{ xs: 3, sm: 2 }}
                  fontSize={13}
                  alignSelf={"center"}
                >
                  <img src="/company/c.jpg" width={190} alt="c" />
                  <label>
                    กรรมการผู้จัดการ <br />
                    แอนบิวตี้ฟูล สกินแคร์ จำกัด{" "}
                  </label>
                  <label>(นาย ธัญญ์วรัต บัวทอง)</label>
                </Stack>
              </Stack>
            </Typography>

            <div style={actionsContainer as React.CSSProperties}>
              {isRegister ? (
                <LoadingButton
                  variant="contained"
                  component={RouterLink}
                  to={"/"}
                  sx={{ mt: 2 }}
                >
                  กลับหน้าหลัก
                </LoadingButton>
              ) : (
                <>
                  <FormControlLabel
                    sx={{ mt: 1 }}
                    control={
                      <Checkbox
                        checked={isAccept}
                        onChange={(e) => setIsAccept(e.target.checked)}
                      />
                    }
                    label="ข้าพเจ้าได้อ่านและยอมรับเงือนไขทั้งหมด"
                  />
                  <LoadingButton
                    variant="contained"
                    loading={isLoading}
                    disabled={!isAccept}
                    onClick={onSubmit}
                    sx={{ mt: 2 }}
                  >
                    ยอมรับเงื่อนไข
                  </LoadingButton>
                </>
              )}
            </div>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
