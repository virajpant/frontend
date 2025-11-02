import Header from "@/components/Header";
import "./globals.css";
import { TaskProvider } from "@/providers/TaskProvider";

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <TaskProvider>
          <Header />
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
