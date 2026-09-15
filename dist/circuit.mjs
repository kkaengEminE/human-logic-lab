export const arity = kind => kind === 'NOT' || kind === 'LAMP' ? 1 : ['AND','OR','XOR'].includes(kind) ? 2 : 0;
export function evaluateCircuit(nodes, edges, unavailable = new Set()) {
  const byId = new Map(nodes.map(n => [n.id, n]));
  const values = new Map(), visiting = new Set();
  function value(id) {
    if (values.has(id)) return values.get(id);
    const n = byId.get(id);
    if (!n || unavailable.has(id) || visiting.has(id)) return null;
    visiting.add(id);
    let result = null;
    if (n.kind === 'INPUT') result = n.value;
    else {
      const ins = Array.from({length:arity(n.kind)}, (_, port) => {
        const e = edges.find(e => e.to === id && e.port === port);
        return e ? value(e.from) : null;
      });
      if (ins.length && ins.every(v => v !== null)) {
        const [a,b] = ins;
        result = n.kind === 'NOT' ? 1-a : n.kind === 'AND' ? a&b : n.kind === 'OR' ? a|b : n.kind === 'XOR' ? a^b : a;
      }
    }
    visiting.delete(id); values.set(id,result); return result;
  }
  nodes.forEach(n=>value(n.id)); return values;
}
export function connectCircuit(nodes, edges, from, to, port) {
  const source = nodes.find(n=>n.id===from), target = nodes.find(n=>n.id===to);
  if (!source || !target) throw Error('연결할 부품을 먼저 배치해 주세요.');
  if (source.kind === 'LAMP') throw Error('전구는 출력 선을 내보내지 않아요.');
  if (!Number.isInteger(port) || port < 0 || port >= arity(target.kind)) throw Error('이 부품에는 해당 입력 단자가 없어요.');
  if (from === to) throw Error('자기 자신에게 연결할 수 없어요.');
  const next = edges.filter(e=>!(e.to===to&&e.port===port));
  const seen = new Set();
  function reaches(id) { if(id===from)return true;if(seen.has(id))return false;seen.add(id);return next.filter(e=>e.from===id).some(e=>reaches(e.to)); }
  if (reaches(to)) throw Error('신호가 되돌아오는 순환 연결은 아직 지원하지 않아요.');
  return [...next,{from,to,port}];
}
