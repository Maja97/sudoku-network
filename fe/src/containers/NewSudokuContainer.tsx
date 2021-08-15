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
import { generateEmptyGrid } from "../helpers/game";
import service from "../service/service";

const NewSudokuContainer = () => {
  // ima li grešaka u gridu -> data.some((item) => item.find((x) => x.error))

  const [data, setData] = React.useState<CellProps[][]>([]);
  const [inputs, setInputs] = React.useState<CellProps[][]>([]);
  const formMethods = useForm();
  const watchAll = formMethods.watch();

  const [sudokuTypeName, setSudokuTypeName] = React.useState<string>(
    sudokuType.standard.name
  );
  const [type, setType] = React.useState<SudokuTypeProps>(sudokuType.standard);

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

  const onCheckUnique = React.useCallback(async () => {
    if (Object.values(watchAll).length > 0) {
      const transformed = [...Array(type.size).keys()]
        .map((index) => {
          let row: any = [];

          [...Array(type.boxRows).keys()].forEach((chunk) => {
            row.push(
              Object.values(watchAll).slice(
                Math.floor(index / type.boxRows) * type.size * type.boxRows +
                  type.boxColumns * (index % type.boxRows) +
                  chunk * type.size,
                Math.floor(index / type.boxRows) * type.size * type.boxRows +
                  +type.boxColumns * (index % type.boxRows) +
                  chunk * type.size +
                  type.boxColumns
              )
            );
          });
          return row.flat();
        })
        .map((row) =>
          row.map((item: string) => ({
            value: item ? parseInt(item) : 0,
            error: false,
            disabled: false,
          }))
        );
      setInputs(transformed);
      const copy = transformed.map((a) => a.map((item: any) => ({ ...item })));
      console.log(transformed);
      await service
        .isUnique({ board: transformed, count: 0, type: type, row: 0, col: 0 })
        .then((res) => console.log(res, "number of solutions"))
        .catch((e) => console.log(e, "error in finding uniqueness"));
    }
  }, [watchAll, type]);

  return (
    <FormProvider {...formMethods}>
      <NewSudokuScreen
        data={data}
        sudokuTypeName={sudokuTypeName}
        type={type}
        onTypeChange={onTypeChange}
        onCheckUnique={onCheckUnique}
      />
    </FormProvider>
  );
};

export default NewSudokuContainer;
