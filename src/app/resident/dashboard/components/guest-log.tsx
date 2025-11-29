import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

const guestLogs = [
  { name: "Alice Johnson", date: "2024-07-28", timeIn: "10:00 AM", timeOut: "1:00 PM", status: "Checked Out" },
  { name: "Bob Williams", date: "2024-07-28", timeIn: "11:30 AM", timeOut: "2:00 PM", status: "Checked Out" },
  { name: "Charlie Brown", date: "2024-07-28", timeIn: "3:00 PM", timeOut: "-", status: "Checked In" },
  { name: "Diana Prince", date: "2024-07-27", timeIn: "5:00 PM", timeOut: "9:00 PM", status: "Checked Out" },
];

export function GuestLog() {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Time Out</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guestLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{log.name}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.timeIn}</TableCell>
              <TableCell>{log.timeOut}</TableCell>
              <TableCell className="text-right">
                <Badge variant={log.status === 'Checked In' ? 'default' : 'outline'}>
                  {log.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
