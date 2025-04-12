"use client";

import AppIcon from "@/components/shared/AppIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { credits, expenses } from "@/constants/transactions";
import { useGetDictionary } from "@/hooks";

/**
 * user transactions component used in the User Panel
 * open in upgrade panel by click on transaction history button
 * @constructor
 */
function Transactions() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  return (
    <Tabs defaultValue="credits" className=" w-full">
      {/*
        tabs trigger list
        - credits
        - expenses
      */}
      <TabsList className="grid h-10 w-40 grid-cols-2 rounded top-0.5">
        <TabsTrigger value="credits" className="rounded-md">
          {userPanelDictionary.transactions_credits_tab_label}
        </TabsTrigger>
        <TabsTrigger value="expenses" className="rounded-md">
          {userPanelDictionary.transactions_expenses_tab_label}
        </TabsTrigger>
      </TabsList>

      {/*
        tabs content
        - credits
        - expenses
      */}
      <TabsContent value="credits" className=" w-full">
        <p className="row my-4 gap-1 text-small font-normal text-label-light">
          <AppIcon icon="grommet-icons:circle-information" width={12} />
          {userPanelDictionary.transactions_descriptions}
        </p>
        <Table className="font-normal">
          <TableHeader>
            <TableRow>
              <TableHead>
                {userPanelDictionary.credits_table_transactions}
              </TableHead>
              <TableHead>
                {userPanelDictionary.transactions_tables_credits}
              </TableHead>
              <TableHead>
                {userPanelDictionary.transactions_tables_balance}
              </TableHead>
              <TableHead className="text-end">
                {userPanelDictionary.credits_table_time}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credits.map(item => (
              <TableRow key={item.id} className="[&>td]:py-2">
                <TableCell>{item.transaction}</TableCell>
                <TableCell className="text-green-600">
                  +{item.credits}
                </TableCell>
                <TableCell>{item.balance}</TableCell>
                <TableCell className="text-end">
                  <p className="col gap-1 font-normal">
                    {item.date}
                    <span className="text-small">{item.time}</span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      <TabsContent value="expenses" className="w-full">
        <Table className="font-normal">
          <TableHeader>
            <TableRow>
              <TableHead>{userPanelDictionary.expenses_table_app}</TableHead>
              <TableHead>
                {userPanelDictionary.expenses_table_consumption}
              </TableHead>
              <TableHead>
                {userPanelDictionary.transactions_tables_credits}
              </TableHead>
              <TableHead className="text-end">
                {userPanelDictionary.credits_table_time}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map(item => (
              <TableRow key={item.id} className="[&>td]:py-2">
                <TableCell>
                  <p className="col gap-1 font-normal">
                    {item.app}
                    <span className="text-small font-light">
                      {item.workspace}
                    </span>
                  </p>
                </TableCell>
                <TableCell>
                  <p className="col gap-1 font-normal">
                    {item.consumption}
                    <span className="text-small font-light">{item.unit}</span>
                  </p>
                </TableCell>
                <TableCell className="text-red-500">-{item.credits}</TableCell>
                <TableCell className="text-end">
                  <p className="col gap-1 font-normal">
                    {item.date}
                    <span className="text-small">{item.time}</span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}

export default Transactions;
