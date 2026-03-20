import { useState, useMemo } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: string;
  details?: string;
}

const initialData: Employee[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', salary: 95000, status: 'Active', details: 'Senior developer with 5 years experience.' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', salary: 72000, status: 'Active', details: 'Leads digital marketing campaigns.' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@company.com', department: 'Sales', salary: 68000, status: 'Inactive', details: 'Top sales performer Q3 2024.' },
  { id: 4, name: 'Diana Prince', email: 'diana@company.com', department: 'Engineering', salary: 110000, status: 'Active', details: 'Tech lead and architect.' },
  { id: 5, name: 'Eve Wilson', email: 'eve@company.com', department: 'HR', salary: 65000, status: 'Active', details: 'Handles recruitment and onboarding.' },
  { id: 6, name: 'Frank Miller', email: 'frank@company.com', department: 'Engineering', salary: 88000, status: 'Active', details: 'Full-stack developer.' },
  { id: 7, name: 'Grace Lee', email: 'grace@company.com', department: 'Design', salary: 82000, status: 'Active', details: 'UI/UX designer with focus on accessibility.' },
  { id: 8, name: 'Henry Davis', email: 'henry@company.com', department: 'Sales', salary: 75000, status: 'Inactive', details: 'Enterprise sales specialist.' },
  { id: 9, name: 'Ivy Chen', email: 'ivy@company.com', department: 'Engineering', salary: 102000, status: 'Active', details: 'DevOps and cloud infrastructure.' },
  { id: 10, name: 'Jack Thompson', email: 'jack@company.com', department: 'Marketing', salary: 70000, status: 'Active', details: 'Content strategy and SEO expert.' },
  { id: 11, name: 'Karen White', email: 'karen@company.com', department: 'HR', salary: 78000, status: 'Active', details: 'Employee relations manager.' },
  { id: 12, name: 'Leo Martinez', email: 'leo@company.com', department: 'Engineering', salary: 97000, status: 'Active', details: 'Mobile app developer.' },
];

export default function Tables() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof Employee>('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCell, setEditingCell] = useState<{ id: number; field: string } | null>(null);
  const [editableData, setEditableData] = useState(initialData);
  const pageSize = 5;

  // Filtered & sorted data
  const filteredData = useMemo(() => {
    let data = editableData.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    );
    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') return sortAsc ? aVal - bVal : bVal - aVal;
      return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
    return data;
  }, [editableData, searchTerm, sortKey, sortAsc]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pagedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: keyof Employee) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const handleCellEdit = (id: number, field: string, value: string) => {
    setEditableData(prev => prev.map(row =>
      row.id === id ? { ...row, [field]: field === 'salary' ? Number(value) || 0 : value } : row
    ));
    setEditingCell(null);
  };

  return (
    <div data-testid="tables-page">
      <h1 className="page-title" data-testid="page-title">Table Controls</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Static, sortable, searchable, paginated, editable, and expandable tables.
      </p>

      {/* Static Table */}
      <div className="card" data-testid="static-table-card">
        <h3 className="card__title">Static Table</h3>
        <div className="table-wrapper">
          <table className="data-table" data-testid="static-table" role="table" aria-label="Static employee table" title="Static Table">
            <thead>
              <tr>
                <th data-testid="th-id">ID</th>
                <th data-testid="th-name">Name</th>
                <th data-testid="th-email">Email</th>
                <th data-testid="th-department">Department</th>
                <th data-testid="th-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {initialData.slice(0, 5).map(row => (
                <tr key={row.id} data-testid={`static-row-${row.id}`}>
                  <td data-testid={`static-cell-${row.id}-id`}>{row.id}</td>
                  <td data-testid={`static-cell-${row.id}-name`}>{row.name}</td>
                  <td data-testid={`static-cell-${row.id}-email`}>{row.email}</td>
                  <td data-testid={`static-cell-${row.id}-dept`}>{row.department}</td>
                  <td data-testid={`static-cell-${row.id}-status`}>
                    <span className={`tag ${row.status === 'Active' ? 'tag-success' : 'tag-error'}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Searchable + Sortable + Paginated Table */}
      <div className="card" data-testid="dynamic-table-card">
        <h3 className="card__title">Searchable, Sortable & Paginated Table</h3>

        {/* Search */}
        <div className="form-group">
          <label htmlFor="table-search" data-testid="table-search-label">Search Table</label>
          <input
            id="table-search"
            type="search"
            className="form-control"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            aria-label="Search Table"
            data-testid="table-search-input"
            data-test="table-search-input"
            title="Search Table"
          />
        </div>

        <div className="table-wrapper">
          <table className="data-table" data-testid="dynamic-table" role="table" aria-label="Dynamic employee table" title="Dynamic Table">
            <thead>
              <tr>
                {(['id', 'name', 'email', 'department', 'salary', 'status'] as (keyof Employee)[]).map(col => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    data-testid={`sort-${col}`}
                    title={`Sort by ${col}`}
                    aria-sort={sortKey === col ? (sortAsc ? 'ascending' : 'descending') : 'none'}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortKey === col && (sortAsc ? ' ▲' : ' ▼')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedData.map(row => (
                <tr key={row.id} data-testid={`dynamic-row-${row.id}`}>
                  <td data-testid={`dynamic-cell-${row.id}-id`}>{row.id}</td>
                  <td data-testid={`dynamic-cell-${row.id}-name`}>{row.name}</td>
                  <td data-testid={`dynamic-cell-${row.id}-email`}>{row.email}</td>
                  <td data-testid={`dynamic-cell-${row.id}-dept`}>{row.department}</td>
                  <td data-testid={`dynamic-cell-${row.id}-salary`}>${row.salary.toLocaleString()}</td>
                  <td data-testid={`dynamic-cell-${row.id}-status`}>
                    <span className={`tag ${row.status === 'Active' ? 'tag-success' : 'tag-error'}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination" data-testid="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="page-prev"
            title="Previous page"
            aria-label="Previous page"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => setCurrentPage(page)}
              data-testid={`page-${page}`}
              title={`Page ${page}`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            data-testid="page-next"
            title="Next page"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
        <p className="help-text" data-testid="table-info">
          Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
        </p>
      </div>

      {/* Editable Table */}
      <div className="card" data-testid="editable-table-card">
        <h3 className="card__title">Editable Table</h3>
        <p className="help-text mb-16">Click on any cell to edit it.</p>
        <div className="table-wrapper">
          <table className="data-table" data-testid="editable-table" role="table" aria-label="Editable employee table" title="Editable Table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {editableData.slice(0, 5).map(row => (
                <tr key={row.id} data-testid={`editable-row-${row.id}`}>
                  <td>{row.id}</td>
                  {(['name', 'email', 'department', 'salary'] as (keyof Employee)[]).map(field => (
                    <td key={field}>
                      {editingCell?.id === row.id && editingCell?.field === field ? (
                        <input
                          autoFocus
                          defaultValue={String(row[field])}
                          onBlur={(e) => handleCellEdit(row.id, field, e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCellEdit(row.id, field, (e.target as HTMLInputElement).value)}
                          data-testid={`edit-input-${row.id}-${field}`}
                          aria-label={`Edit ${field} for ${row.name}`}
                        />
                      ) : (
                        <div
                          className="editable-cell"
                          onClick={() => setEditingCell({ id: row.id, field })}
                          data-testid={`editable-cell-${row.id}-${field}`}
                          title={`Click to edit ${field}`}
                        >
                          {field === 'salary' ? `$${(row[field] as number).toLocaleString()}` : row[field]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}
