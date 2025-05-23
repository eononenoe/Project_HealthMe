import { Typography, Box, Stack } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const pieData = [
  { name: "케어", value: 24 },
  { name: "리빙", value: 12 },
  { name: "의류", value: 9 },
  { name: "위생", value: 8 },
  { name: "주식", value: 6 },
  { name: "간식", value: 5 },
];

const barData = [
  { date: "24일", 금액: 0 },
  { date: "25일", 금액: 150000 },
  { date: "26일", 금액: 470000 },
  { date: "27일", 금액: 100000 },
  { date: "28일", 금액: 40000 },
  { date: "29일", 금액: 30000 },
  { date: "30일", 금액: 70000 },
];

const COLORS = [
  "#8884d8",
  "#8dd1e1",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#ffbb28",
];

export default function Dashboard() {
  return (
    <>
      <Box sx={{ mt: "45px", px: 4, py: 3 }}>
        {/* 위쪽 여백 45px, 좌우 패딩 32px, 위아래 패딩 24px */}
        {/* 전체 콘텐츠 박스 */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
            p: 4,
          }}
        >
          {/* 상단 영역 */}
          <Box display="flex" justifyContent="space-between" gap={4} mb={6}>
            {/* 왼쪽: 거래 현황 */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                이번 달 거래 현황
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <InfoIcon /> 거래 수 <strong>38개</strong>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <CancelIcon /> 거래 취소 수 <strong>9개</strong>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <DoneIcon /> 거래 확정 수 <strong>24개</strong>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoneyIcon /> 총 매출 금액 <strong>467,200원</strong>
                </Box>
              </Stack>
            </Box>

            {/* 오른쪽: 카테고리 통계 */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                거래 카테고리 통계
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* 하단 영역 */}
          <Box display="flex" justifyContent="space-between" gap={4}>
            {/* 왼쪽: 상품 현황 */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                현재 상품 현황
              </Typography>
              <Stack spacing={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ShoppingCartIcon /> 총 상품 수 <strong>84개</strong>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <ReportProblemIcon /> 품절 상품 수 <strong>5개</strong>
                </Box>
              </Stack>
            </Box>

            {/* 오른쪽: 거래 금액 통계 */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                이번 주 거래 금액 통계
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={barData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="금액" barSize={30} fill="#ffc658" />
                  <Line type="monotone" dataKey="금액" stroke="#ff3333" />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
