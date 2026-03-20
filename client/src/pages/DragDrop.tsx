import { useState } from 'react';

export default function DragDrop() {
  // Sortable list
  const [sortableItems, setSortableItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Drag between containers
  const [container1, setContainer1] = useState(['Task A', 'Task B', 'Task C']);
  const [container2, setContainer2] = useState(['Task D', 'Task E']);
  const [dragItem, setDragItem] = useState<{ item: string; source: 'c1' | 'c2' } | null>(null);
  const [dragOverContainer, setDragOverContainer] = useState<string | null>(null);

  // Sortable list handlers
  const handleSortDragStart = (index: number) => setDragIndex(index);
  const handleSortDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const items = [...sortableItems];
    const [removed] = items.splice(dragIndex, 1);
    items.splice(index, 0, removed);
    setSortableItems(items);
    setDragIndex(index);
  };

  // Container drag handlers
  const handleContainerDragStart = (item: string, source: 'c1' | 'c2') => {
    setDragItem({ item, source });
  };

  const handleContainerDrop = (target: 'c1' | 'c2') => {
    if (!dragItem) return;
    if (dragItem.source === target) { setDragItem(null); setDragOverContainer(null); return; }

    if (dragItem.source === 'c1') {
      setContainer1(prev => prev.filter(i => i !== dragItem.item));
      setContainer2(prev => [...prev, dragItem.item]);
    } else {
      setContainer2(prev => prev.filter(i => i !== dragItem.item));
      setContainer1(prev => [...prev, dragItem.item]);
    }
    setDragItem(null);
    setDragOverContainer(null);
  };

  return (
    <div data-testid="drag-drop-page">
      <h1 className="page-title" data-testid="page-title">Drag & Drop</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice drag and drop with sortable lists and cross-container dragging.
      </p>

      {/* Sortable List */}
      <div className="card" data-testid="sortable-list-card">
        <h3 className="card__title">Sortable List</h3>
        <p className="help-text mb-16">Drag items to reorder them.</p>
        <div className="drag-list" data-testid="sortable-list" role="list" aria-label="Sortable list">
          {sortableItems.map((item, index) => (
            <div
              key={item}
              className={`drag-item ${dragIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleSortDragStart(index)}
              onDragOver={(e) => handleSortDragOver(e, index)}
              onDragEnd={() => setDragIndex(null)}
              data-testid={`sortable-item-${index}`}
              data-test={`sortable-item-${index}`}
              role="listitem"
              aria-label={item}
              title={`Drag to reorder: ${item}`}
            >
              <span style={{ cursor: 'grab', fontSize: '1.2rem' }}>⠿</span>
              {item}
            </div>
          ))}
        </div>
        <p className="help-text mt-16" data-testid="sortable-order">
          Current order: {sortableItems.join(', ')}
        </p>
      </div>

      {/* Cross Container Drag */}
      <div className="card" data-testid="cross-container-card">
        <h3 className="card__title">Drag Between Containers</h3>
        <p className="help-text mb-16">Drag cards from one container to another.</p>
        <div className="grid-2">
          {/* Container 1 */}
          <div
            className={`drag-container ${dragOverContainer === 'c1' ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverContainer('c1'); }}
            onDragLeave={() => setDragOverContainer(null)}
            onDrop={() => handleContainerDrop('c1')}
            data-testid="drag-container-1"
            data-test="drag-container-1"
            role="group"
            aria-label="Container 1"
            title="Container 1"
          >
            <h4 style={{ marginBottom: 12, color: '#1976d2' }} data-testid="container-1-title">To Do</h4>
            {container1.map(item => (
              <div
                key={item}
                className="drag-item"
                draggable
                onDragStart={() => handleContainerDragStart(item, 'c1')}
                data-testid={`c1-item-${item.toLowerCase().replace(/\s+/g, '-')}`}
                role="listitem"
                aria-label={item}
                title={item}
              >
                {item}
              </div>
            ))}
            {container1.length === 0 && <p className="help-text">Drop items here</p>}
          </div>

          {/* Container 2 */}
          <div
            className={`drag-container ${dragOverContainer === 'c2' ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverContainer('c2'); }}
            onDragLeave={() => setDragOverContainer(null)}
            onDrop={() => handleContainerDrop('c2')}
            data-testid="drag-container-2"
            data-test="drag-container-2"
            role="group"
            aria-label="Container 2"
            title="Container 2"
          >
            <h4 style={{ marginBottom: 12, color: '#4caf50' }} data-testid="container-2-title">Done</h4>
            {container2.map(item => (
              <div
                key={item}
                className="drag-item"
                draggable
                onDragStart={() => handleContainerDragStart(item, 'c2')}
                data-testid={`c2-item-${item.toLowerCase().replace(/\s+/g, '-')}`}
                role="listitem"
                aria-label={item}
                title={item}
              >
                {item}
              </div>
            ))}
            {container2.length === 0 && <p className="help-text">Drop items here</p>}
          </div>
        </div>
        <p className="help-text mt-16" data-testid="containers-state">
          To Do: {container1.join(', ') || 'Empty'} | Done: {container2.join(', ') || 'Empty'}
        </p>
      </div>
    </div>
  );
}
