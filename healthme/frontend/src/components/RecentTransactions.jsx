import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const recentTransactions = [
  { item: "고양이 간식", date: "2025-05-01", amount: "12,000원" },
  { item: "강아지 리드줄", date: "2025-05-01", amount: "15,000원" },
  { item: "고양이 모래", date: "2025-04-30", amount: "9,800원" },
];

function RecentTransactions() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        최근 거래 내역
      </Typography>
      <List>
        {recentTransactions.map((t, i) => (
          <ListItem key={i} divider>
            <ListItemText
              primary={t.item}
              secondary={`${t.date} • ${t.amount}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentTransactions;
