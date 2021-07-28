import React from "react";
import NewSudokuScreen from "../screens/NewSudokuScreen";
import { sudokuType, SudokuTypeProps } from "../constants/sudokuTypes";
import {
  checkForConstraints,
  columnFromIndex,
  rowFromIndex,
} from "../helpers/sudokuConstraints";
import { CellProps } from "../components/SudokuBox";
import { FormProvider, useForm } from "react-hook-form";
import { generateEmptyGrid, isUnique, solveSudoku } from "../helpers/game";

const NewSudokuContainer = () => {
  // ima li grešaka u gridu -> data.some((item) => item.find((x) => x.error))

  const [data, setData] = React.useState<CellProps[][]>([]);
  const formMethods = useForm();

  const [sudokuTypeName, setSudokuTypeName] = React.useState<string>(
    sudokuType.standard.name
  );
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);

  const errors = React.useMemo(
    () => data.some((item) => item.find((x) => x.error)),
    [data]
  );

  React.useEffect(() => {
    const newType = Object.values(sudokuType).find(
      (item) => item.name === sudokuTypeName
    );
    if (newType) {
      setType(newType);
      setData(generateEmptyGrid(newType));
    }
  }, [sudokuTypeName]);

  const onTypeChange = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSudokuTypeName(event.target.value as string);
    },
    []
  );

  const onCellChange = React.useCallback(
    (cellIndex: number, value: number) => {
      const copy = [...data];
      const row = rowFromIndex(cellIndex, type.size);
      const column = columnFromIndex(cellIndex, type.size);

      const error = !checkForConstraints(data, row, column, type, value);

      copy[row][column] = { value: value, error: error, disabled: false };
      setData(copy);
    },
    [data, type]
  );

  const onCheckUnique = React.useCallback(() => {
    const copy = data.map((a) => a.map((item) => ({ ...item })));
    const copy2 = data.map((a) => a.map((item) => ({ ...item })));
    console.log(isUnique(copy, 0, type, 0, 0));
    if (solveSudoku(copy, type)) {
      console.log(copy);
    } else console.log("no solution sorrey");
  }, [data, type.size]);

  return (
    <FormProvider {...formMethods}>
      <NewSudokuScreen
        data={data}
        sudokuTypeName={sudokuTypeName}
        type={type}
        onCellChange={onCellChange}
        onTypeChange={onTypeChange}
        onCheckUnique={onCheckUnique}
      />
    </FormProvider>
  );
};

export default NewSudokuContainer;
