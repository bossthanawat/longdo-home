import { Separator } from "@/components/ui/separator";
import { fNumber } from "@/utils/formatNumber";
import { Residental, PropertyType, Province } from "@prisma/client";
import dayjs from "dayjs";

type ResidentalProps = {
  data: Residental & {
    property_type: PropertyType;
    province: Province;
  };
};
const ResidentalDetail = (props: ResidentalProps) => {
  const { data } = props;
  return (
    <>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-3">
        <Description
          title="ชื่อโครงการ"
          value={`${data.name_th} (${data.name_en})`}
        />
        <Description title="property" value={data.property_type.name_th} />
        <Description title="ราคา (ต่ำสุด)" value={fNumber(data.price_min)} />
        <Description
          title="developer"
          value={data.developer_name_th || data.developer_name_en}
        />
        <Description title="จังหวัด" value={data.province.b_prov_name_th} />
        <Description
          title="วันที่สร้างโครงการเสร็จ"
          value={
            data.date_finish && dayjs(data.date_finish).format("DD/MM/YYYY")
          }
        />
        <Description
          title="วันที่สร้างข้อมูล"
          value={dayjs(data.date_created).format("DD/MM/YYYY")}
        />
        <Description
          title="วันที่อัปเดตข้อมูลล่าสุด"
          value={dayjs(data.date_updated).format("DD/MM/YYYY")}
        />
        <Description title="URL Project">
          {data.url_project && (
            <a
              href={data.url_project}
              rel="noopener noreferrer"
              target="_blank"
              className="text-teal-600"
            >
              Link
            </a>
          )}
        </Description>
      </div>
      <Separator className="my-3" />
      <div className="grid xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-3 col-span-2">
        {!!data.count_elevator && (
          <Description
            title="จำนวนลิฟต์โดยสารในโครงการ"
            value={data.count_elevator}
          />
        )}
        {!!data.count_elevator_service && (
          <Description
            title="จำนวนลิฟต์ขนของในโครงการ"
            value={data.count_elevator_service}
          />
        )}
        {!!data.count_floor && (
          <Description
            title="จำนวนชั้นของตัวโครงการ"
            value={data.count_floor}
          />
        )}
        {!!data.count_parking && (
          <Description
            title="จำนวนที่จอดรถในโครงการ"
            value={data.count_parking}
          />
        )}
        {!!data.count_tower && (
          <Description
            title="จำนวนอาคารในโครงการ (เฉพาะคอนโด)"
            value={data.count_tower}
          />
        )}
        {!!data.count_unit && (
          <Description title="จำนวนยูนิตในโครงการ" value={data.count_unit} />
        )}
        {!!data.count_unittype && (
          <Description
            title="จำนวนแบบบ้านในโครงการ"
            value={data.count_unittype}
          />
        )}
        {!!data.facility_clubhouse && (
          <Description
            title="สิ่งอำนวยความสะดวก clubhouse"
            value={data.facility_clubhouse}
          />
        )}
        {!!data.facility_fitness && (
          <Description
            title="สิ่งอำนวยความสะดวก fitness"
            value={data.facility_fitness}
          />
        )}
        {!!data.facility_meeting && (
          <Description
            title="สิ่งอำนวยความสะดวก meeting room"
            value={data.facility_meeting}
          />
        )}
        {!!data.facility_park && (
          <Description
            title="สิ่งอำนวยความสะดวก สวน"
            value={data.facility_park}
          />
        )}
        {!!data.facility_playground && (
          <Description
            title="สิ่งอำนวยความสะดวก สนามเด็กเล่น"
            value={data.facility_playground}
          />
        )}
        {!!data.facility_playground && (
          <Description
            title="สิ่งอำนวยความสะดวก สระว่ายน้ำ"
            value={data.facility_pool}
          />
        )}
        {!!data.facility_security && (
          <Description
            title="สิ่งอำนวยความสะดวก หน่วยรักษาความปลอดภัย"
            value={data.facility_security}
          />
        )}
      </div>
    </>
  );
};

export default ResidentalDetail;
type DescriptionProps = {
  title: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
};
const Description = ({ title, value, children }: DescriptionProps) => (
  <div className="flex flex-col gap">
    <p className="text-sm text-slate-500">{title}</p>
    <div>{children || <p>{value ? value : "-"}</p>}</div>
  </div>
);
