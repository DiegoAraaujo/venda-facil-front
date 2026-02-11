import type { ProductVariant } from "../interface";

interface VariantsTableProps {
  variants: ProductVariant[];
  updateVariantStock: (id: number, stock: number) => void;
  deleteVariant: (id: number) => void;
}

const VariantsTable = ({
  variants,
  updateVariantStock,
  deleteVariant,
}: VariantsTableProps) => {
  const visibleVariants = variants.filter((v) => !v.deleted_at);

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="text-gray-500 text-sm bg-gray-50">
            <th className="border border-gray-200 px-3 py-2 text-left">
              Tamanho
            </th>
            <th className="border border-gray-200 px-3 py-2 text-left">Cor</th>
            <th className="border border-gray-200 px-3 py-2 text-left">
              Estoque
            </th>
            <th className="border border-gray-200 px-3 py-2 text-left">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {visibleVariants.map((v) => (
            <tr key={v.id}>
              <td className="border border-gray-200 px-3 py-2 text-xs">
                {v.size}
              </td>
              <td className="border border-gray-200 px-3 py-2 text-xs">
                {v.color}
              </td>
              <td className="border border-gray-200 px-3 py-2 text-xs">
                <input
                  type="number"
                  value={v.stock}
                  onChange={(e) =>
                    updateVariantStock(v.id, Number(e.target.value))
                  }
                  className="rounded px-1 w-full focus:outline-0"
                />
              </td>
              <td className="border border-gray-200 px-3 py-2 text-xs text-center">
                <button
                  type="button"
                  onClick={() => deleteVariant(v.id)}
                  disabled={variants.length <= 1}
                  className="bg-red-500 text-white rounded-xl px-2 cursor-pointer hover:-translate-y-0.5 duration-300 transition-transform disabled:bg-red-400 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default VariantsTable;
