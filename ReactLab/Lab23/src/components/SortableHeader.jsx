import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender } from '@tanstack/react-table';

export const SortableHeader = ({ header }) => {
  // 1. Сначала вызываем все хуки
  const sortable = useSortable({
    id: header?.column?.id || 'default-id', // Запасной ID на случай отсутствия header
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = sortable;

  // 2. Затем проверяем валидность header
  const isValidHeader = header && header.column && header.getContext;
  if (!isValidHeader) {
    console.error('Invalid header prop provided to SortableHeader');
    return null;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    cursor: isDragging ? 'grabbing' : 'grab',
    opacity: isDragging ? 0.8 : 1,
    backgroundColor: isDragging ? '#f8f9fa' : 'inherit',
    position: 'relative',
    zIndex: isDragging ? 100 : 'auto',
  };

  const canSort = header.column.getCanSort();

  // 3. Рендерим только если header валиден
  return isValidHeader ? (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      colSpan={header.colSpan}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
      className={canSort ? 'sortable-column' : ''}
    >
      <div className="d-flex align-items-center">
        {flexRender(header.column.columnDef.header, header.getContext())}
        {canSort && (
          <span className="ms-1">
            {{
              asc: '🔼',
              desc: '🔽',
            }[header.column.getIsSorted()] ?? '↕️'}
          </span>
        )}
      </div>
    </th>
  ) : null;
};

SortableHeader.propTypes = {
  header: PropTypes.shape({
    column: PropTypes.shape({
      id: PropTypes.string.isRequired,
      getCanSort: PropTypes.func.isRequired,
      getToggleSortingHandler: PropTypes.func.isRequired,
      getIsSorted: PropTypes.func.isRequired,
      columnDef: PropTypes.shape({
        header: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.node,
        ]).isRequired,
      }).isRequired,
    }).isRequired,
    getContext: PropTypes.func.isRequired,
    colSpan: PropTypes.number,
  }).isRequired,
};